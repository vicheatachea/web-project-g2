import React from 'react';
import styles from './BrowseByGenre.module.css';

function BrowseByGenres({genres}) {
    const handleGenreClick = (genreName) => {
        alert(`You clicked on the ${genreName} genre`);
        // Later, this will display the albums and songs from the genre.
    };

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

export default BrowseByGenres;
