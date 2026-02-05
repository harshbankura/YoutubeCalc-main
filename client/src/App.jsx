import React, { useState, useEffect } from 'react';
import './App.css';
import PlaylistInput from './components/PlaylistInput';
import DurationDisplay from './components/DurationDisplay';
import VideoTable from './components/VideoTable';
import HistoryList from './components/HistoryList';
import { calculatePlaylist, getHistory } from './services/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleCalculate = async (url) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await calculatePlaylist(url);
      setResult(res.data);
      fetchHistory(); // Refresh history
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to calculate duration. Please check the URL and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <header className="header">
          <div className="logo-badge">YT Calc</div>
          <h1>YouTube Playlist Time Calculator</h1>
          <h2>Calculate Total Playlist Duration at 1x, 1.25x, 1.5x and 2x Speed</h2>
          <p className="seo-description">
            This YouTube Playlist Time Calculator helps you calculate the total duration of any YouTube playlist. You can see how long it will take to complete the playlist at 1x, 1.25x, 1.5x, and 2x speed. It also shows video-wise duration and links.
          </p>
        </header>

        <main className="main-content">
          <div className="search-section">
            <PlaylistInput onCalculate={handleCalculate} loading={loading} />
          </div>

          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}

          {result && (
            <div className="results-container">
              <DurationDisplay
                title={result.playlistTitle}
                videoCount={result.videoCount}
                totalDuration={result.totalDuration}
              />
              <h3 className="section-title">Video-wise Duration Breakdown</h3>
              <VideoTable videos={result.videos} />
            </div>
          )}

          {!result && !loading && (
            <div className="history-section">
              <HistoryList history={history} onSelect={handleCalculate} />
            </div>
          )}
        </main>

        <footer className="footer">
          <p>&copy; HarshBankura 2026</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
