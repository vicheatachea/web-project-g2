import React, { useState, useRef } from 'react';
import styles from './MusicPlayer.module.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1); // Volume state (0 to 1)
  const [isShuffling, setIsShuffling] = useState(false); // Shuffle state
  const [isRepeating, setIsRepeating] = useState(false); // Repeat state
  const audioRef = useRef();

  const song = {
    name: "Old Town Road",
    audioUrl: "https://p.scdn.co/mp3-preview/c9de05440773961287640cae5ee1fc128d74c11f?cid=a5dc3df835304fad873598a8edb29140",
    imageUrl: "https://i.scdn.co/image/ab67616d00001e02c0e7bf5cdd630f314f20586a"
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  // Handle time update for progress bar
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  // Seek within the audio
  const handleSeek = (e) => {
    const newProgress = e.target.value;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (newProgress / 100) * duration;
    setProgress(newProgress);
  };

  // Handle volume control
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100; // Convert 0-100 range to 0-1
    setVolume(newVolume);
    audioRef.current.volume = newVolume; // Adjust the audio element's volume
  };

  // Handle audio end
  const handleAudioEnd = () => {
    if (isRepeating) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  };

  // Toggle shuffle mode
  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
    // Shuffle logic will go here if you have a list of songs
  };

  // Toggle repeat mode
  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  return (
      <div className={styles.MusicPlayer}>
      <div className={styles.nowPlaying}>Now Playing</div>
      <div className={styles.imageContainer}>
        <img src={song.imageUrl} alt="Artist" className={styles.artistImage} />
      </div>
      <div className={styles.songTitle}>
        {song.name}
        <span role="img" aria-label="motivation"></span>
      </div>

      <audio 
        ref={audioRef} 
        src={song.audioUrl} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleAudioEnd}
      />

      {/* Progress bar */}
      <div className={styles.progressBarContainer}>
        <input
          type="range"
          value={progress}
          step="0.1"
          max="100"
          onChange={handleSeek}
          className={styles.progressBar}
        />
      </div>

      {/* Volume control slider */}
      <div className={styles.volumeContainer}>
        <label htmlFor="volume" className={styles.volumeLabel}>Volume</label>
        <input
          id="volume"
          type="range"
          value={volume * 100} // Convert 0-1 range to 0-100 for UI
          step="1"
          min="0"
          max="100"
          onChange={handleVolumeChange}
          className={styles.volumeSlider}
        />
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button onClick={toggleShuffle} className={styles.controlButton}>
          {isShuffling ? '🔀' : '🔀'}
        </button>

        <button onClick={() => audioRef.current.currentTime = 0} className={styles.controlButton}>
          ⏪
        </button>

        <button onClick={togglePlay} className={styles.controlButton}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <button onClick={() => audioRef.current.currentTime = audioRef.current.duration} className={styles.controlButton}>
          ⏩
        </button>

        <button onClick={toggleRepeat} className={styles.controlButton}>
          {isRepeating ? '🔁' : '🔁'}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;

/*import React, { useState, useEffect, useRef } from 'react';
import styles from './MusicPlayer.module.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1); // Volume state (0 to 1)
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

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100; // Convert 0-100 range to 0-1
    setVolume(newVolume);
    audioRef.current.volume = newVolume; // Adjust the audio element's volume
  };

  return (
    <div className={styles.MusicPlayer}>
      <div className={styles.nowPlaying}>Now Playing</div>
      <div className={styles.imageContainer}>
        <img src={song.imageUrl} alt="Artist" className={styles.artistImage} />
      </div>
      <div className={styles.songTitle}>
        {song.name}
        <span role="img" aria-label="motivation"></span>
      </div>

      <audio 
        ref={audioRef} 
        src={song.audioUrl} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleAudioEnd}
      />

      {/* Progress bar *}
      <div className={styles.progressBarContainer}>
        <input
          type="range"
          value={progress}
          step="0.1"
          max="100"
          onChange={handleSeek}
          className={styles.progressBar}
        />
      </div>

      {/* Volume control slider *}
      <div className={styles.volumeContainer}>
        <label htmlFor="volume" className={styles.volumeLabel}>Volume</label>
        <input
          id="volume"
          type="range"
          value={volume * 100} // Convert 0-1 range to 0-100 for UI
          step="1"
          min="0"
          max="100"
          onChange={handleVolumeChange}
          className={styles.volumeSlider}
        />
      </div>

      {/* Controls *}
      <div className={styles.controls}>
        <button onClick={() => audioRef.current.currentTime = 0} className={styles.controlButton}>
          ⏪
        </button>
        
        <button onClick={togglePlay} className={styles.controlButton}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <button onClick={() => audioRef.current.currentTime = audioRef.current.duration} className={styles.controlButton}>
          ⏩
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer; */