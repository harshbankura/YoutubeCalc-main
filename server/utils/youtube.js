const axios = require('axios');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Parse ISO 8601 duration to seconds
const parseDuration = (duration) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || 0, 10);
    const minutes = parseInt(match[2] || 0, 10);
    const seconds = parseInt(match[3] || 0, 10);

    return hours * 3600 + minutes * 60 + seconds;
};

// Extract Playlist ID from URL
const extractPlaylistId = (url) => {
    try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('list');
    } catch (error) {
        return null;
    }
};

// Fetch all videos from playlist (handling pagination)
const getPlaylistVideos = async (playlistId) => {
    let videos = [];
    let nextPageToken = null;

    try {
        // Fetch playlist title first (optional, but good for history) - wait, playlistItems provides video titles. 
        // We might want to list playlist details. `playlists.list` is better for playlist title.
        // But user asked for "Playlist Title" in history. So I should fetch playlist metadata too.

        // Let's loop for items
        do {
            const response = await axios.get(`${YOUTUBE_BASE_URL}/playlistItems`, {
                params: {
                    part: 'snippet,contentDetails',
                    playlistId: playlistId,
                    maxResults: 50,
                    pageToken: nextPageToken,
                    key: YOUTUBE_API_KEY,
                },
            });

            const items = response.data.items;
            videos = videos.concat(items.map(item => ({
                title: item.snippet.title,
                videoId: item.contentDetails.videoId,
                thumbnail: item.snippet.thumbnails?.default?.url,
                // We don't get duration here.
            })));

            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);

        return videos;
    } catch (error) {
        console.error('Error fetching playlist items:', error.message);
        throw new Error('Failed to fetch playlist items');
    }
};

const getPlaylistDetails = async (playlistId) => {
    try {
        const response = await axios.get(`${YOUTUBE_BASE_URL}/playlists`, {
            params: {
                part: 'snippet',
                id: playlistId,
                key: YOUTUBE_API_KEY
            }
        });
        if (response.data.items.length === 0) return null;
        return response.data.items[0].snippet;
    } catch (error) {
        console.error('Error fetching playlist details:', error.message);
        throw new Error('Failed to fetch playlist details');
    }
}

// Fetch video durations (batching 50 at a time)
const getVideoDurations = async (videoIds) => {
    // videoIds is array of strings
    const chunks = [];
    for (let i = 0; i < videoIds.length; i += 50) {
        chunks.push(videoIds.slice(i, i + 50));
    }

    let videoDetailsMap = {}; // videoId -> duration (seconds)

    try {
        for (const chunk of chunks) {
            const response = await axios.get(`${YOUTUBE_BASE_URL}/videos`, {
                params: {
                    part: 'contentDetails',
                    id: chunk.join(','),
                    key: YOUTUBE_API_KEY,
                },
            });

            response.data.items.forEach(item => {
                videoDetailsMap[item.id] = parseDuration(item.contentDetails.duration);
            });
        }

        return videoDetailsMap;
    } catch (error) {
        console.error('Error fetching video details:', error.message);
        throw new Error('Failed to fetch video details');
    }
};

module.exports = {
    extractPlaylistId,
    getPlaylistVideos,
    getVideoDurations,
    getPlaylistDetails,
};
