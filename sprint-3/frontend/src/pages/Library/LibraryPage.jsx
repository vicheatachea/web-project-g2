import React, { useEffect, useState } from 'react';
import { useBackend } from '../../hooks/useBackend';
import { useNavigate } from 'react-router-dom';
import styles from './LibraryPage.module.css';

const Library = ({ theme }) => {
    const { sendRequest, data, error } = useBackend();
    const [libraryData, setLibraryData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await sendRequest('/api/collections', 'GET');
            setLibraryData(response || []);
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await sendRequest(`/api/collections/${id}`, 'DELETE');
        setLibraryData((prevData) => prevData.filter((collection) => collection.id !== id));
    };

    const handleCollectionClick = (id) => {
        navigate(`/collection/album/${id}`);
    };

    if (error) {
        const errorMessage = typeof error === 'object' && error.message ? error.message : error;
        return <div>Error: {errorMessage}</div>;
    }

    if (!libraryData || libraryData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`${styles.library} library-page ${theme}`}>
            <h1 className={styles.libraryTitle}>My Library</h1>
            <div className={styles.collectionSection}>
                {libraryData.length > 0 ? (
                    <ul className={styles.collectionDisplay}>
                        {libraryData.map((collection) => (
                            <li
                                className={styles.collectionId}
                                key={collection.id}
                                onClick={() => handleCollectionClick(collection.id)}
                            >
                                <div className={styles.collectionInfo}>
                                    {collection.image && (
                                        <img
                                            src={collection.image}
                                            alt={collection.name}
                                            className={styles.collectionImage}
                                        />
                                    )}
                                    <strong className={styles.collectionName}>
                                        {collection.name}
                                    </strong>
                                    <span className={styles.collectionDetails}>
                                        {collection.type} - {collection.songAmount} songs
                                    </span>
                                </div>
                                <button
                                    className={styles.deleteButton}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent the click event from bubbling up to the li
                                        handleDelete(collection.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No saved collections</p>
                )}
            </div>
        </div>
    );
};

export default Library;