import React from "react";
import styles from "./CollectionItem.module.css";

const CollectionItem = ({ item, index }) => {
    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={styles.item}>
            <div className={styles.number}>{index + 1}</div>
            <div className={styles.details}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.artist}>
                    {item.artists.map(artist => artist.name).join(", ")}
                </p>
                <p className={styles.duration}>{formatDuration(item.duration_ms)}</p>
            </div>
        </div>
    );
};

export default CollectionItem;