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
        { id: 7, title: 'Result seven', imgSrc: 'https://via.placeholder.com/150' },
        { id: 8, title: 'Result Eight', imgSrc: 'https://via.placeholder.com/150' },
        { id: 9, title: 'Result Nine', imgSrc: 'https://via.placeholder.com/150' },
        { id: 10, title: 'Result Ten', imgSrc: 'https://via.placeholder.com/150' },
        { id: 11, title: 'Result Eleven', imgSrc: 'https://via.placeholder.com/150' },
        { id: 12, title: 'Result Twelve', imgSrc: 'https://via.placeholder.com/150' },
        { id: 13, title: 'Result Thirteeen', imgSrc: 'https://via.placeholder.com/150' },
        
    ];

    return (
        <div className="top-hits">
            <h2 className="top-hits-title">Results ({songs.length})</h2>
            <div className="top-hits-list">
                {songs.map(song => (
                    <div className="song-card" key={song.id}>
                        <img className="song-image"  src={song.imgSrc} alt={song.title}/>
                        <p className="song-title">{song.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
