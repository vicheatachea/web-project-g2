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