import React from 'react';
import './SearchResults.css';

function SearchResults() {
    const songs = [
        { id: 1, title: 'Result One', imgSrc: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Result Two', imgSrc: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Result Three', imgSrc: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Result Four', imgSrc: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Result Five', imgSrc: 'https://via.placeholder.com/150' },
        { id: 6, title: 'Result Six', imgSrc: 'https://via.placeholder.com/150' },
        { id: 7, title: 'Result Seven', imgSrc: 'https://via.placeholder.com/150' },
        
        
    ];

    return (
        <div className="search-section">
            <h2 className="search-title">Search Results ({songs.length})</h2>
            <div className="search-list">
                {songs.map(song => (
                    <div className="search-item" key={song.id}>
                        <img className="search-item-image" src={song.imgSrc} alt={song.title} />
                        <p className="search-item-title">{song.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
