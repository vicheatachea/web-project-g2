import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

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
    <div className="music-player">
      <div className="now-playing">Now Playing</div>
      <div className="image-container">
        <img src={song.imageUrl} alt="Artist" className="artist-image" />
      </div>
      <div className="song-title">
        {song.name}
        <span role="img" aria-label="motivation"></span>
      </div>

      <audio 
        ref={audioRef} 
        src={song.audioUrl} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleAudioEnd}
      />

      <div className="progress-bar-container">
        <input
          type="range"
          value={progress}
          step="0.1"
          max="100"
          onChange={handleSeek}
          className="progress-bar"
        />
      </div>

      <div className="controls">
        <button onClick={() => audioRef.current.currentTime = 0} className="control-button">
          ⏪
        </button>
        
        <button onClick={togglePlay} className="control-button">
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <button onClick={() => audioRef.current.currentTime = audioRef.current.duration} className="control-button">
          ⏩
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
