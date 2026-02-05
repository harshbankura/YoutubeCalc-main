import React, { useState } from 'react';

const PlaylistInput = ({ onCalculate, loading }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url.trim()) {
            onCalculate(url);
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit} className="input-group">
                <input
                    type="text"
                    placeholder="Paste YouTube Playlist URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={loading}
                />
                <button type="submit" disabled={loading || !url.trim()}>
                    {loading ? 'Calculating...' : 'Calculate'}
                </button>
            </form>
        </div>
    );
};

export default PlaylistInput;
