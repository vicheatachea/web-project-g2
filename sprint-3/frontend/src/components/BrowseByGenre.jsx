import React, {useEffect, useState} from 'react';
import './BrowseByGenre.css';
import {recommendedGenres} from "../utils/spotifyRequests.js";

function BrowseByGenres({ theme }) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const genresData = await recommendedGenres();
            console.log(genresData);
            setGenres(genresData);
        };

        fetchGenres();
    }, []);

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
                        key={genre}
                        className="genre-card" 
                        onClick={() => handleGenreClick(genre)}>
                        {genre}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BrowseByGenres;



/*
import React, { useEffect, useState } from 'react';
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