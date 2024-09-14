import React from 'react';
import './BrowseByGenre.css';

function BrowseByGenres({ theme }) {
    // Dummy data for genres
    const genres = [
        { id: 1, name: 'Pop' },
        { id: 2, name: 'Rock' },
        { id: 3, name: 'Hip Hop' },
        { id: 4, name: 'Jazz' },
        { id: 5, name: 'Classical' },
        { id: 6, name: 'Country' },
        { id: 7, name: 'Electronic' },
        { id: 8, name: 'Reggae' },
        { id: 9, name: 'Blues' },
        { id: 10, name: 'R&B' }
    ];

    const handleGenreClick = (genreName) => {
        alert(`You clicked on the ${genreName} genre`);
        // Later, this will display the albums and songs from the genre.
    };

    return (
        <section className="genres">
            <h2 className="genre-title">Browse by Genres</h2>
            <div className={`genre-cards ${theme}`}>
                {genres.map((genre) => (
                    <div 
                        key={genre.id} 
                        className="genre-card" 
                        onClick={() => handleGenreClick(genre.name)}>
                        {genre.name}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BrowseByGenres;



/* import React, { useEffect, useState } from 'react';
import './BrowseByGenre.css';

function BrowseByGenres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // Replace this with a real API call to Spotify
        const fetchGenres = async () => {
            const response = await fetch('https://api.spotify.com/v1/genres', {
                headers: {
                    Authorization: `Bearer YOUR_SPOTIFY_ACCESS_TOKEN`,
                },
            });
            const data = await response.json();
            setGenres(data.genres);
        };

        fetchGenres();
    }, []);

    const handleGenreClick = (genreId) => {
        // Replace this with code to fetch albums and songs for the clicked genre
        console.log(`Fetching albums and songs for genre ID: ${genreId}`);
    };

    return (
        <section className="genres">
            <h2 className="genre-section-title">Browse by Genres</h2>
            <div className="genre-cards">
                {genres.map((genre) => (
                    <div className="genre-card" 
                        key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                        <p>{genre.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BrowseByGenres;
 */