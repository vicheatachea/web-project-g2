import React, { useState, useEffect } from 'react';
import styles from './MusicPlayer.module.css'; 

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const song = {
    name: "old town road",
    audioUrl: "https://p.scdn.co/mp3-preview/c9de05440773961287640cae5ee1fc128d74c11f?cid=a5dc3df835304fad873598a8edb29140",
    imageUrl: "https://i.scdn.co/image/ab67616d00001e02c0e7bf5cdd630f314f20586a"
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  const handleSeek = (e) => {
    const newProgress = e.target.value;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (newProgress / 100) * duration;
    setProgress(newProgress);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setProgress(0);
  };

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
