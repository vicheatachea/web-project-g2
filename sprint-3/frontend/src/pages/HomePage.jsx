import React, {useEffect, useState} from 'react'
import Hero from '../components/Hero';
import BrowseByGenre from '../components/BrowseByGenre';
import CardList from '../components/CardList';
import HorizontalLine from "../components/HorizontalLine.jsx";
import {
    newReleases,
    topHits
} from "../utils/spotifyRequests.js";

function HomePage() {
    const [newAlbums, setNewAlbums] = useState([]);
    const [hitTracks, setHitTracks] = useState([]);

    useEffect(() => {
        const fetchNewAlbums = async () => {
            const albumData = await newReleases();
            setNewAlbums(albumData);
        };

        fetchNewAlbums();
    }, []);

    useEffect(() => {
        const fetchTopHits = async () => {
            const topHitsData = await topHits();
            setHitTracks(topHitsData);
        };

        fetchTopHits();
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

    return (
        <>
            <Hero/>
            <CardList title="New Releases" items={newAlbums} />
            <HorizontalLine/>
            <CardList title="Top Hits" items={hitTracks} />
            <HorizontalLine/>
            <BrowseByGenre/>
        </>
    )
}

export default HomePage