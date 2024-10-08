import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CollectionPage.module.css";
import CollectionItem from "../../components/CollectionItem/CollectionItem";
import { useSpotifyGet } from "../../hooks/useSpotifyGet";
import { useBackend } from "../../hooks/useBackend";

const CollectionPage = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { data: collection, error } = useSpotifyGet(`/api/spotify/collection/${type}/${id}`);
    const { sendRequest } = useBackend();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!collection) {
        return <div>Loading...</div>;
    }

    const handlePlayClick = () => {
        if (collection.tracks?.length > 0) {
            navigate(`/play?v=${collection.tracks[0].id}`);
        }
    };

    const handleShufflePlayClick = () => {
        if (collection.tracks?.length > 0) {
            const randomIndex = Math.floor(Math.random() * collection.tracks.length);
            navigate(`/play?v=${collection.tracks[randomIndex].id}`);
        }
    };

    const handleSaveToLibraryClick = async () => {
        const data = {
            id: collection.id,
            name: collection.name,
            type: type,
            songAmount: collection.total_tracks,
            image: collection.image_url
        };
        await sendRequest("/api/collections", "POST", data);
    };

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
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
                        <p className={styles.smallText}>Total Tracks: {collection.total_tracks}</p>
                        {collection.release_date && (
                            <p className={styles.smallText}>Release Date: {collection.release_date}</p>
                        )}
                    </div>
                </div>
                <div className={styles.right}>
                    <button className={styles.button} onClick={handlePlayClick}>Play</button>
                    <button className={styles.button} onClick={handleShufflePlayClick}>Shuffle Play</button>
                    <button className={styles.button} onClick={handleSaveToLibraryClick}>Save to Library</button>
                </div>
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