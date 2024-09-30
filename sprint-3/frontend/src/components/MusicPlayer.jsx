import React, { useState, useEffect } from 'react';
import styles from './MusicPlayer.module.css'; 

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
    <div className={styles.musicPlayer}>
      <div className={styles.nowPlaying}>Now Playing</div>
      <div className={styles.imageContainer}>
        <img src="https://via.placeholder.com/400" alt="Artist" className={styles.artistImage} />
      </div>
      <div className={styles.songTitle}>
        Whatever It Takes Song
        <span role="img" aria-label="motivation">🔥</span>
      </div>
      <div className={styles.progressBarContainer}>
        <input
          type="range"
          value={progress}
          step="0.1"
          max="100"
          onChange={e => setProgress(e.target.value)}
          className={styles.progressBar}
        />
      </div>
      <div className={styles.controls}>
        <button onClick={() => setProgress(0)} className={styles.controlButton}>
          ⏪
        </button>
        
        <button onClick={togglePlay} className={styles.controlButton}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <button onClick={() => setProgress(100)} className={styles.controlButton}>
          ⏩
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
