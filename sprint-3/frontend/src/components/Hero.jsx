import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-content">
                    <h1 className="sickbeat-phrase">FIND MUSIC THAT MATCHES YOUR TASTE</h1>
                    <div className="sickbeat-text">
                        Browse through our diverse range of carefully selected songs, designed to bring out your
                        individuality and cater to your sense of style.
                    </div>
                    <div className="browse-button">
                        <button>Browse Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
