import React from 'react';

const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
};

const HistoryList = ({ history, onSelect }) => {
    if (!history.length) return null;

    return (
        <div className="card">
            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Recent Playlist Calculations</h3>
            <div className="history-list">
                {history.map((item) => (
                    <div key={item._id} className="history-item" onClick={() => onSelect(item.playlistUrl)}>
                        <div className="history-info">
                            <h4>{item.playlistTitle}</h4>
                            <p>{item.videoCount} videos • {formatTime(item.totalDuration)}</p>
                        </div>
                        <div className="date">
                            {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryList;
