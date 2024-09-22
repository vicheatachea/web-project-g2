import React from "react";
import styles from "./Card.module.css";

function Card({ item }) {
    return (
        <article className={styles.card}>
            <img className={styles.image} src={item.imgSrc} alt={item.title} />
            <p className={styles.title}>{item.title}</p>
        </article>
    );
}

export default Card;