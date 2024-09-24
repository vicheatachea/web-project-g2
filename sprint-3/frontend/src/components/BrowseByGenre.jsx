import React, {useEffect, useState} from 'react';
import './BrowseByGenre.css';
import {recommendedGenres} from "../utils/spotifyRequests.js";

function BrowseByGenres({ theme }) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const genresData = await recommendedGenres();
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
