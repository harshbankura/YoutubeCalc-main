import React from 'react';

const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
};

const DurationDisplay = ({ totalDuration, videoCount, title }) => {
    return (
        <div className="card">
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h2>
                <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)' }}>{videoCount} videos found</p>
            </div>

            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-label">Normal Speed (1x)</div>
                    <div className="stat-value">{formatTime(totalDuration)}</div>
                </div>
                <div className="stat-item">
                    <div className="stat-label">1.25x Speed</div>
                    <div className="stat-value">{formatTime(Math.round(totalDuration / 1.25))}</div>
                </div>
                <div className="stat-item">
                    <div className="stat-label">1.5x Speed</div>
                    <div className="stat-value">{formatTime(Math.round(totalDuration / 1.5))}</div>
                </div>
                <div className="stat-item">
                    <div className="stat-label">2x Speed</div>
                    <div className="stat-value">{formatTime(Math.round(totalDuration / 2))}</div>
                </div>
            </div>
        </div>
    );
};

export default DurationDisplay;
