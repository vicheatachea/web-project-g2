import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./MusicPlayerPage.module.css";
import { useSpotifyGet } from '../../hooks/useSpotifyGet';

function MusicPlayerPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1); // Volume state, initialized to 1
    const [track, setTrack] = useState(null);
    const [currentTime, setCurrentTime] = useState(0); // Current time state
    const [duration, setDuration] = useState(0); // Track duration state
    const audioRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const trackId = query.get('v');

    const { data, error } = useSpotifyGet(`/api/spotify/track/${trackId}`);


    // Load volume from local storage on mount
    useEffect(() => {
        const savedVolume = localStorage.getItem('music-player-volume');
        if (savedVolume !== null) {
            setVolume(parseFloat(savedVolume)); // Parse the saved volume and set it
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume; // Set the audio element's volume to match the state
        }
    }, [volume]); // Update audio volume whenever volume state changes

    useEffect(() => {
        if (error) {
            alert("Error loading track data");
            navigate(-1);
        } else if (data) {
            setTrack(data);
            if (data.preview_url === "none") {
                alert("This track can't be previewed");
                navigate(-1);
            }
        }
    }, [data, error, navigate]);

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
        setCurrentTime(currentTime); // Update current time state
        setProgress((currentTime / duration) * 100);
    };

    const handleSeek = (e) => {
        const newProgress = e.target.value;
        const duration = audioRef.current.duration;
        audioRef.current.currentTime = (newProgress / 100) * duration;
        setProgress(newProgress);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume); // Update volume state
        localStorage.setItem('music-player-volume', newVolume); // Save volume to local storage
    };

    const handleAudioLoaded = () => {
        setDuration(audioRef.current.duration); // Set the duration once the audio is loaded
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0); // Reset current time when track ends
    };

    const skipToStart = () => {
        audioRef.current.currentTime = 0;
        setProgress(0);
        setCurrentTime(0);
    };

    const skipToEnd = () => {
        audioRef.current.currentTime = audioRef.current.duration;
        setProgress(100);
        setCurrentTime(audioRef.current.duration);
    };

    // Function to format time in MM:SS format
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <section className={styles.musicPlayer}>
            <div className={styles.nowPlaying}>Now Playing</div>
            <div className={styles.imageContainer}>
                {track?.album?.image_url && (
                    <img src={track.album.image_url} alt={track.name} className={styles.artistImage} />
                )}
            </div>
            <div className={styles.songTitle}>{track?.name || "Loading..."}</div>
            <div className={styles.artistName}>{track?.artists?.[0]?.name || "Unknown Artist"}</div>

            {track?.preview_url && track.preview_url !== "none" && (
                <audio
                    ref={audioRef}
                    src={track.preview_url}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleAudioLoaded} // Load track metadata to get duration
                    onEnded={handleAudioEnd}
                />
            )}

            <div className={styles.progressBarContainer}>
                <input
                    type="range"
                    className={styles.progressBar}
                    value={progress}
                    onChange={handleSeek}
                />
                <div className={styles.timeInfo}>
                    <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className={styles.volumeControl}>
                <label htmlFor="volume">Volume</label>
                <input
                    type="range"
                    id="volume"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>

            <div className={styles.controls}>
                <button className={styles.controlButton} onClick={skipToStart}>
                    ⏮️
                </button>
                <button className={styles.controlButton} onClick={togglePlay}>
                    {isPlaying ? "⏸️" : "▶️"}
                </button>
                <button className={styles.controlButton} onClick={skipToEnd}>
                    ⏭️
                </button>
            </div>
        </section>
    );
}

export default MusicPlayerPage;
