import React from 'react';
import styles from './ConnectPrompt.module.css';

function ConnectPrompt() {
    const handleConnect = () => {
        window.location.href = '/api/spotify/login';
    };

    return (
        <div className={styles.prompt}>
            <p className={styles.text}>
                Connect to your Spotify account to see results
            </p>
            <button className={styles.button} onClick={handleConnect}>
                Connect to Spotify
            </button>
        </div>
    );
}

export default ConnectPrompt;
