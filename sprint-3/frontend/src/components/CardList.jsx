import React, { useState } from 'react';
import Card from './Card';

function CardList({ title, items }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleItems = 6; // Number of items to show at a time

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleItems, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + visibleItems, items.length - visibleItems)
        );
    };

    return (
        <section className="card-list-section">
            <h2 className="card-list-title">{title}</h2>
            <div className="card-slider">
                <button className="left-arrow" onClick={handlePrevious}>❮</button>
                <div className="card-list">
                    {items.slice(currentIndex, currentIndex + visibleItems).map(item => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
                <button className="right-arrow" onClick={handleNext}>❯</button>
            </div>
        </section>
    );
}

export default CardList;