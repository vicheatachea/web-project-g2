import React from "react";
import styles from "./Card.module.css";

function Card({ item }) {
    return (
        <article className={styles.card}>
            <img className={styles.cardImage} src={item.imgSrc} alt={item.title} />
            <p className={styles.cardTitle}>{item.title}</p>
        </article>
    );
}

export default Card;