import React from 'react';
import './TopHits.css';

function TopHits() {
    // Placeholder data until you connect to the API
    const songs = [
        { id: 1, title: 'Song One', imgSrc: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Song Two', imgSrc: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Song Three', imgSrc: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Song Four', imgSrc: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Song Five', imgSrc: 'https://via.placeholder.com/150' },
        { id: 6, title: 'Song Six', imgSrc: 'https://via.placeholder.com/150' },
        { id: 7, title: 'Song Seven', imgSrc: 'https://via.placeholder.com/150' },
        { id: 8, title: 'Song Eight', imgSrc: 'https://via.placeholder.com/150' },
        { id: 9, title: 'Song Nine', imgSrc: 'https://via.placeholder.com/150' },
        { id: 10, title: 'Song Ten', imgSrc: 'https://via.placeholder.com/150' },
        { id: 11, title: 'Song Eleven', imgSrc: 'https://via.placeholder.com/150' },
        { id: 12, title: 'Song Twelve', imgSrc: 'https://via.placeholder.com/150' },
        { id: 13, title: 'Song Thirteen', imgSrc: 'https://via.placeholder.com/150' },
        { id: 14, title: 'Song Fourteen', imgSrc: 'https://via.placeholder.com/150' },
    ];

    return (
        <div className="top-hits">
            <h2 className="top-hits-title">Top Hits</h2>
            <div className="top-hits-list">
                {songs.map(song => (
                    <div className="song-card" key={song.id}>
                        <img className="song-image"  src={song.imgSrc} alt={song.title}/>
                        <p className="song-title">{song.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopHits;

/*
import React, { useState, useEffect } from 'react';
import './TopHits.css';

const TopHits = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchTopHits = async () => {
            try {
                const accessToken = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // Replace with your Spotify access token
                const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();

                // Assuming the API response has a field for albums
                const topHits = data.albums.items.map(album => ({
                    id: album.id,
                    title: album.name,
                    imgSrc: album.images[0]?.url || 'https://via.placeholder.com/150'
                }));

                setSongs(topHits);
            } catch (error) {
                console.error('Error fetching top hits:', error);
            }
        };

        fetchTopHits();
    }, []);

    return (
        <div className="top-hits">
            <h2 className="top-hits-title">Top Hits</h2>
            <div className="top-hits-list">
                {songs.map(song => (
                    <div className="song-card" key={song.id}>
                        <img className="song-image" src={song.imgSrc} alt={song.title} />
                        <p className="song-title">{song.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopHits;
*/