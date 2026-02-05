const express = require('express');
const router = express.Router();
const History = require('../models/History');
const { extractPlaylistId, getPlaylistVideos, getVideoDurations, getPlaylistDetails } = require('../utils/youtube');

// @route   POST /api/playlist/calculate
// @desc    Calculate playlist duration
// @access  Public
router.post('/calculate', async (req, res) => {
    const { playlistUrl } = req.body;

    if (!playlistUrl) {
        return res.status(400).json({ error: 'Playlist URL is required' });
    }

    const playlistId = extractPlaylistId(playlistUrl);
    if (!playlistId) {
        return res.status(400).json({ error: 'Invalid Playlist URL' });
    }

    try {
        // 1. Get Playlist Details (Title)
        const playlistDetails = await getPlaylistDetails(playlistId);
        const playlistTitle = playlistDetails ? playlistDetails.title : 'Unknown Playlist';

        // 2. Get All Videos in Playlist
        const videos = await getPlaylistVideos(playlistId);
        if (videos.length === 0) {
            return res.status(404).json({ error: 'No videos found in this playlist' });
        }

        // 3. Get Durations for all videos
        const videoIds = videos.map(v => v.videoId);
        const durationMap = await getVideoDurations(videoIds);

        // 4. Combine data and calculate total
        let totalDuration = 0;
        const processedVideos = videos.map(video => {
            const duration = durationMap[video.videoId] || 0;
            totalDuration += duration;
            return {
                ...video,
                duration, // seconds
                videoUrl: `https://www.youtube.com/watch?v=${video.videoId}`
            };
        });

        // 5. Save to History
        const historyItem = new History({
            playlistUrl,
            playlistTitle,
            videoCount: videos.length,
            totalDuration,
        });
        await historyItem.save();

        // 6. Return Response
        res.json({
            playlistTitle,
            videoCount: videos.length,
            totalDuration, // seconds
            videos: processedVideos,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
});

// @route   GET /api/playlist/history
// @desc    Get search history
// @access  Public
router.get('/history', async (req, res) => {
    try {
        const history = await History.find().sort({ createdAt: -1 }).limit(10);
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
