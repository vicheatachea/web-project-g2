import React, { useEffect, useState } from 'react';
import { useBackend } from '../../hooks/useBackend';
import styles from './LibraryPage.module.css';

const Library = ({ theme }) => {
    const { sendRequest, data, error } = useBackend();
    const [libraryData, setLibraryData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await sendRequest('/api/collections', 'GET');
            setLibraryData(response.data);
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await sendRequest(`/api/collections/${id}`, 'DELETE');
        setLibraryData((prevData) => prevData.filter((collection) => collection.id !== id));
    };

    if (error) {
        const errorMessage = typeof error === 'object' && error.message ? error.message : error;
        return <div>Error: {errorMessage}</div>;
    }

    if (!libraryData.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`${styles.library} library-page ${theme}`}>
            <h1 className={styles.libraryTitle}>My Collections</h1>
            <div className={styles.collectionSection}>
                <h2 className={styles.collectionTitle}>Collections</h2>
                {libraryData.length > 0 ? (
                    <ul className={styles.collectionDisplay}>
                        {libraryData.map((collection) => (
                            <li className={styles.collectionId} key={collection.id}>
                                <strong>{collection.name}</strong> - {collection.type} - {collection.songAmount} songs
                                <button onClick={() => handleDelete(collection.id)}>Delete</button>
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