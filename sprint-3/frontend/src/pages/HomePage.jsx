import React, {useEffect, useState} from 'react'
import Hero from '../components/Hero';
import BrowseByGenre from '../components/BrowseByGenre';
import CardList from '../components/CardList';
import HorizontalLine from "../components/HorizontalLine.jsx";
import {
    recommendedGenres,
    newReleases,
} from "../utils/spotifyRequests.js";

function HomePage() {
    const [newAlbums, setNewAlbums] = useState([]);

    useEffect(() => {
        const fetchNewAlbums = async () => {
            const albumData = await newReleases();
            setNewAlbums(albumData);
        };

        fetchNewAlbums();
    }, []);

    const searchResults = [
        { id: 1, title: 'Result One', imgSrc: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Result Two', imgSrc: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Result Three', imgSrc: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Result Four', imgSrc: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Result Five', imgSrc: 'https://via.placeholder.com/150' },
        { id: 6, title: 'Result Six', imgSrc: 'https://via.placeholder.com/150' },
        { id: 7, title: 'Result Seven', imgSrc: 'https://via.placeholder.com/150' },


    ];

    const topHits = [
        { id: 1, name: 'Song One', image_url: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Song Two', image_url: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Song Three', image_url: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Song Four', image_url: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Song Five', image_url: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Song Six', image_url: 'https://via.placeholder.com/150' },
        { id: 7, name: 'Song Seven', image_url: 'https://via.placeholder.com/150' },
        { id: 8, name: 'Song Eight', image_url: 'https://via.placeholder.com/150' },
        { id: 9, name: 'Song Nine', image_url: 'https://via.placeholder.com/150' },
        { id: 10, name: 'Song Ten', image_url: 'https://via.placeholder.com/150' },
        { id: 11, name: 'Song Eleven', image_url: 'https://via.placeholder.com/150' },
        { id: 12, name: 'Song Twelve', image_url: 'https://via.placeholder.com/150' },
        { id: 13, name: 'Song Thirteen', image_url: 'https://via.placeholder.com/150' },
        { id: 14, name: 'Song Fourteen', image_url: 'https://via.placeholder.com/150' },
    ];

    return (
        <>
            <Hero/>
            <CardList title="New Releases" items={newAlbums} />
            <HorizontalLine/>
            <CardList title="Top Hits" items={topHits} />
            <HorizontalLine/>
            <BrowseByGenre/>
        </>
    )
}

export default HomePage