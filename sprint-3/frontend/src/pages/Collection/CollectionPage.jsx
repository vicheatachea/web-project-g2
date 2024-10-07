import React from "react";
import { useParams } from "react-router-dom";
import styles from "./CollectionPage.module.css";
import CollectionItem from "../../components/CollectionItem/CollectionItem";
import { useSpotifyGet } from "../../hooks/useSpotifyGet";

const CollectionPage = () => {
    const { type, id } = useParams();
    const { data: collection, error } = useSpotifyGet(`/api/spotify/collection/${type}/${id}`);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!collection) {
        return <div>Loading...</div>;
    }

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <div className={styles.imageWrapper}>
                    <img
                        className={styles.playlistImage}
                        src={collection.image_url}
                        alt={collection.name}
                    />
                </div>
                <div className={styles.headerText}>
                    <p className={styles.smallText}>{type.toUpperCase()}</p>
                    <h1 className={styles.title}>{collection.name}</h1>
                </div>
            </div>
            <div className={styles.controls}>
                <button className={styles.playButton}>Play</button>
            </div>
            <div className={styles.items}>
                {collection.tracks?.length > 0 ? (
                    collection.tracks.map((track, index) => (
                        <CollectionItem key={track.id} item={track} index={index} />
                    ))
                ) : (
                    <p>No tracks available</p>
                )}
            </div>
        </section>
    );
};

export default CollectionPage;