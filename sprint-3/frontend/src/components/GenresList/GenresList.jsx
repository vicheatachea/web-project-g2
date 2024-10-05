import React from 'react';
import ErrorPrompt from '../ConnectPrompt/ErrorPrompt.jsx';
import styles from './GenresList.module.css';

function GenresList({genres, error}) {
    const handleGenreClick = (genreName) => {
        alert(`You clicked on the ${genreName} genre`);
        // Later, this will display the albums and songs from the genre.
    };

    if (error) {
        return <ErrorPrompt error={error}/>;
    }

    return (
        <section className={styles.genres}>
            <h2 className={styles.genreTitle}>Browse by Genres</h2>
            <div className={`${styles.genreCards}`}>
                {genres.map((genre) => (
                    <div
                        key={genre}
                        className={styles.genreCard}
                        onClick={() => handleGenreClick(genre)}>
                        {genre}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default GenresList;
