import React, { useEffect } from 'react';
import { useBackend } from '../hooks/useBackend';
import styles from './Library.module.css';

const Library = ({ theme }) => {
    const { sendRequest, data, status, error } = useBackend();

    useEffect(() => {
        const fetchLibraryData = async () => {
            await sendRequest('/api/collections', 'GET');
        };

        fetchLibraryData();
    }, [sendRequest]);

    const handleDelete = async (id, type) => {
        await sendRequest(`/api/collections`, 'DELETE', { id, type });
        if (status === 200) {
            await sendRequest('/api/collections', 'GET'); // Refresh data after deletion
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={`${styles.library} library-page ${theme}`}>
            <h1 className={styles.libraryTitle}>My Saved Songs and Playlists</h1>

            <div className={styles.playlistSection}>
                <h2 className={styles.playlistTitle}>Playlists</h2>
                {data.playlists.length > 0 ? (
                    <ul className={styles.playlistDisplay}>
                        {data.playlists.map((playlist) => (
                            <li className={styles.playlistId} key={playlist.id}>
                                <strong>{playlist.name}</strong> - {playlist.description} ({playlist.totalSongs} songs)
                                <button onClick={() => handleDelete(playlist.id, 'playlist')}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No saved playlists</p>
                )}
            </div>

            <div className={styles.songsSection}>
                <h2 className={styles.songsTitle}>Songs</h2>
                {data.songs.length > 0 ? (
                    <ul className={styles.songsDisplay}>
                        {data.songs.map((song) => (
                            <li className={styles.songsId} key={song.id}>
                                <strong>{song.name}</strong> by {song.artist}
                                <button onClick={() => handleDelete(song.id, 'song')}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No saved songs</p>
                )}
            </div>
        </div>
    );
};

export default Library;