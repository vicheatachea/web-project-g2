import React, { useState, useEffect } from 'react';
import './MusicPlayer.css'; // Importing the CSS file

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 100) {
            clearInterval(id);
            return 100;
          }
          return prevProgress + 0.1;
        });
      }, 100);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <div className="music-player">
      <div className="now-playing">Now Playing</div>
      <div className="image-container">
        <img src="https://via.placeholder.com/400" alt="Artist" className="artist-image" />
      </div>
      <div className="song-title">
        Whatever It Takes Song
        <span role="img" aria-label="motivation">🔥</span>
      </div>
      <div className="progress-bar-container">
        <input
          type="range"
          value={progress}
          step="0.1"
          max="100"
          onChange={e => setProgress(e.target.value)}
          className="progress-bar"
        />
      </div>
      <div className="controls">
        <button onClick={() => setProgress(0)} className="control-button">
          ⏪
        </button>
        
        <button onClick={togglePlay} className="control-button">
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <button onClick={() => setProgress(100)} className="control-button">
          ⏩
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
