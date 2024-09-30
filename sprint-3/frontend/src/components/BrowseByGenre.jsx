import React, {useEffect, useState} from 'react';
import styles from './BrowseByGenre.module.css';
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
        <section className={styles.genres}>
            <h2 className={styles.genreTitle}>Browse by Genres</h2>
            <div className={`${styles.genreCards} ${theme}`}>
                {genres.map((genre) => (
                    <div 
                        key={genre.id} 
                        className={styles.genreCard} 
                        onClick={() => handleGenreClick(genre.name)}>
                        {genre.name}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BrowseByGenres;
