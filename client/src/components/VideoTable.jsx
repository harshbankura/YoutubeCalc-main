import React from 'react';

const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
};

const VideoTable = ({ videos }) => {
    return (
        <div className="card">
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Video Details</h3>
            <div style={{ overflowX: 'auto' }}>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Duration</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video, index) => (
                            <tr key={index}>
                                <td style={{ color: 'var(--text-secondary)' }}>{index + 1}</td>
                                <td>
                                    <img src={video.thumbnail} alt="thumb" style={{ width: '60px', borderRadius: '4px' }} />
                                </td>
                                <td style={{ maxWidth: '300px' }}>{video.title}</td>
                                <td>{formatTime(video.duration)}</td>
                                <td>
                                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                                        Watch
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VideoTable;
