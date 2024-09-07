import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h2>FIND MUSIC THAT MATCHES YOUR TASTE</h2>
                <div className="statistics">
                    <span>200+</span>
                    <span>2,000+</span>
                    <span>30,000+</span>
                </div>
                <div className="artist-slider">
                    <button className="prev">‹</button>
                    <div className="artists">
                        {/* Add artist images here */}
                    </div>
                    <button className="next">›</button>
                </div>
            </div>
        </section>
    );
}

export default Hero;
