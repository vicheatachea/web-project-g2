import React, { useState } from 'react';
import Card from './Card';
import styles from './CardList.module.css';

function CardList({ title, items }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleItems = 5; // Number of items to show at a time

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleItems, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + visibleItems, items.length - visibleItems)
        );
    };

    const canGoPrevious = currentIndex > 0;
    const canGoNext = currentIndex + visibleItems < items.length;

    return (
        <section className={styles.cardSection}>
            <h2 className={styles.cardTitle}>{title}</h2>
            <div className={styles.cardSlider}>
                <button className={`${styles.cardArrow} ${!canGoPrevious ? styles.hiddenArrow : ''}`}
                        onClick={handlePrevious}>❮</button>
                <div className={styles.cardList}>
                    {items.slice(currentIndex, currentIndex + visibleItems).map(item => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
                <button className={`${styles.cardArrow} ${!canGoNext ? styles.hiddenArrow : ''}`}
                        onClick={handleNext}>❯</button>
            </div>
        </section>
    );
}

export default CardList;