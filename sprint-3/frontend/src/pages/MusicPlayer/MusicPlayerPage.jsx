import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./MusicPlayerPage.module.css";
import { useSpotifyGet } from '../../hooks/useSpotifyGet';
import { toast } from 'react-toastify';

function MusicPlayerPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1); // New state for volume
    const [track, setTrack] = useState(null);
    const audioRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const trackId = query.get('v');

    const { data, error } = useSpotifyGet(`/api/spotify/track/${trackId}`);

    useEffect(() => {
        if (error) {
            toast.error("Error loading track data");
            navigate(-1);
        } else if (data) {
            setTrack(data);
            if (data.preview_url === "none") {
                toast.error("This track can't be previewed");
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
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
        setProgress(0);
    };

    const skipToStart = () => {
        audioRef.current.currentTime = 0;
        setProgress(0);
    };

    const skipToEnd = () => {
        audioRef.current.currentTime = audioRef.current.duration;
        setProgress(100);
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

            {track?.preview_url && track.preview_url !== "none" && (
                <audio
                    ref={audioRef}
                    src={track.preview_url}
                    onTimeUpdate={handleTimeUpdate}
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