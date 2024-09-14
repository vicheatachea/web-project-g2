import React, { useState } from 'react';
import './NewReleases.css';

function NewReleases() {
    // Dummy data for new releases
    const albums = [
        { id: 1, title: 'Album One', imgSrc: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Album Two', imgSrc: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Album Three', imgSrc: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Album Four', imgSrc: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Album Five', imgSrc: 'https://via.placeholder.com/150' },
        { id: 6, title: 'Album Six', imgSrc: 'https://via.placeholder.com/150' },
        { id: 7, title: 'Album Seven', imgSrc: 'https://via.placeholder.com/150' },
        { id: 8, title: 'Album Eight', imgSrc: 'https://via.placeholder.com/150' },
        { id: 9, title: 'Album Nine', imgSrc: 'https://via.placeholder.com/150' },
        { id: 10, title: 'Album Ten', imgSrc: 'https://via.placeholder.com/150' },
        { id: 11, title: 'Album Eleven', imgSrc: 'https://via.placeholder.com/150' },
        { id: 12, title: 'Album Twelve', imgSrc: 'https://via.placeholder.com/150' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleAlbums = 6; // Number of albums to show at a time

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleAlbums, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + visibleAlbums, albums.length - visibleAlbums)
        );
    };

    return (
        <div className="new-releases">
            <h2 className="new-releases-title">New Releases</h2>
            <div className="album-slider">
                <button className="left-arrow" onClick={handlePrev}>❮</button>
                <div className="album-list">
                    {albums.slice(currentIndex, currentIndex + visibleAlbums).map(album => (
                        <div className="album-card" key={album.id}>
                            <img className="album-image" src={album.imgSrc} alt={album.title}/>
                            <p className="album-title">{album.title}</p>
                        </div>
                    ))}
                </div>
                <button className="right-arrow" onClick={handleNext}>❯</button>
            </div>
        </div>
    );
}

export default NewReleases;




/* import React, { useState, useEffect } from 'react';
import './NewReleases.css';

function NewReleases() {
    const [albums, setAlbums] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleAlbums = 6; // Number of albums to show at a time

    useEffect(() => {
        // Fetch new releases from the Spotify API
        fetch('https://api.spotify.com/v1/browse/new-releases', {
            headers: {
                'Authorization': `Bearer YOUR_SPOTIFY_ACCESS_TOKEN`
            }
        })
            .then(response => response.json())
            .then(data => {
                const fetchedAlbums = data.albums.items.map(album => ({
                    id: album.id,
                    title: album.name,
                    imgSrc: album.images[0]?.url, // Get the first available image
                }));
                setAlbums(fetchedAlbums);
            })
            .catch(error => console.error('Error fetching new releases:', error));
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleAlbums, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + visibleAlbums, albums.length - visibleAlbums)
        );
    };

    return (
        <div className="new-releases">
            <h2 className="new-releases-title">New Releases</h2>
            <div className="album-slider">
                <button className="left-arrow" onClick={handlePrev}>❮</button>
                <div className="album-list">
                    {albums.slice(currentIndex, currentIndex + visibleAlbums).map(album => (
                        <div className="album-card" key={album.id}>
                            <img className="album-image" src={album.imgSrc} alt={album.title}/>
                            <p className="album-title">{album.title}</p>
                        </div>
                    ))}
                </div>
                <button className="right-arrow" onClick={handleNext}>❯</button>
            </div>
        </div>
    );
}

export default NewReleases;
 */