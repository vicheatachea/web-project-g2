import React, {useEffect, useState} from 'react'
import styles from "./LibraryPage.module.css";

function LibraryPage({theme}) {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulating login check
    const [playlists, setPlaylists] = useState([]); // Saved playlists
    const [songs, setSongs] = useState([]); // Saved songs


    // Mock data for saved songs and playlists
    useEffect(() => {
        const savedPlaylists = [
            {id: 1, name: 'Chill Vibes', description: 'Relaxing and chill songs', totalSongs: 20},
            {id: 2, name: 'Workout Mix', description: 'Upbeat tunes for workouts', totalSongs: 30},
        ];
        const savedSongs = [
            {id: 1, name: 'Song A', artist: 'Artist A'},
            {id: 2, name: 'Song B', artist: 'Artist B'},
            {id: 3, name: 'Song C', artist: 'Artist C'},
        ];


        setPlaylists(savedPlaylists);
        setSongs(savedSongs);
    }, []);


    // If library is not logged in, redirect to login
    if (!isLoggedIn) {
        return (
            <div className={styles.redirectLogin}>
                <p>You are not logged in. <a href='/login'>Log in here</a></p>
            </div>
        );
    }


    return (
        <div className={`${styles.library} library-page ${theme}`}>
            <h1 className={styles.libraryTitle}>My Saved Songs and Playlists</h1>


            <div className={styles.playlistSection}>
                <h2 className={styles.playlistTitle}>Playlists</h2>
                {playlists.length > 0 ? (
                    <ul className={styles.playlistDisplay}>
                        {playlists.map((playlist) => (
                            <li className={styles.playlistId} key={playlist.id}>
                                <strong>{playlist.name}</strong> - {playlist.description} ({playlist.totalSongs} songs)
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No saved playlists</p>
                )}
            </div>


            <div className={styles.songsSection}>
                <h2 className={styles.songsTitle}>Songs</h2>
                {songs.length > 0 ? (
                    <ul className={styles.songsDisplay}>
                        {songs.map((song) => (
                            <li className={styles.songsId} key={song.id}>
                                <strong>{song.name}</strong> by {song.artist}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No saved songs</p>
                )}
            </div>
        </div>
    );
}

export default LibraryPage
