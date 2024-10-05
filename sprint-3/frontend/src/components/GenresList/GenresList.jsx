import React from 'react';
import ErrorPrompt from '../ErrorPrompt/ErrorPrompt.jsx';
import styles from './GenresList.module.css';

function GenresList({ genres, error }) {
    const visibleItems = 5; // Number of items to show per row

    const handleGenreClick = (genreName) => {
        alert(`You clicked on the ${genreName} genre`);
        // Later, this will display the albums and songs from the genre.
    };

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    };

    if (error) {
        return <ErrorPrompt error={error} />;
    }

    return (
        <section className={styles.genres}>
            <h2 className={styles.title}>Browse by Genres</h2>
            <div className={styles.cards} style={{ gridTemplateColumns: `repeat(${visibleItems}, 1fr)` }}>
                {genres.map((genre) => (
                    <div
                        key={genre}
                        className={styles.card}
                        onClick={() => handleGenreClick(genre)}
                    >
                        {capitalizeWords(genre)}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default GenresList;