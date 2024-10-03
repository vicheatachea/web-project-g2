import React from 'react';
import styles from './Hero.module.css';
import heroBackgroundLight from '../images/hero-background-light.jpg';
import heroBackgroundDark from '../images/hero-background-dark.jpg';

function Hero() {
    const isDarkMode = document.body.classList.contains('dark');
    const backgroundImage = isDarkMode ? heroBackgroundDark : heroBackgroundLight;

    return (
        <section className={styles.hero}>
            <div
                className={styles.heroBackground}
                style={{backgroundImage: `url(${backgroundImage})`}}
            >
                <div className={styles.heroContent}>
                    <h1 className={styles.sickbeatPhrase}>FIND MUSIC THAT MATCHES YOUR TASTE</h1>
                    <div className={styles.sickbeatText}>
                        Browse through our diverse range of carefully selected songs, designed to bring out your
                        individuality and cater to your sense of style.
                    </div>
                    <div className={styles.browseButton}>
                        <button>Browse Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
