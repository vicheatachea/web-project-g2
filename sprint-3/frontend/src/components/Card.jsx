import React from "react";
import styles from "./Card.module.css";

function Card({item}) {
    const validArtists = Array.isArray(item.artists)
        ? item.artists.filter(artist => artist && artist.name)
        : [];

    return (
        <article className={styles.card}>
            <img className={styles.image} src={item.image_url} alt={item.name}/>
            <p className={styles.title}>{item.name}</p>
            <p>{validArtists.map(artist => artist.name).join(', ')}</p>
        </article>
    );
}

export default Card;