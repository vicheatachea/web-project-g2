import React, {useEffect, useState} from 'react'
import Hero from '../components/Hero';
import { useLocation, useNavigate } from 'react-router-dom';
import BrowseByGenre from '../components/BrowseByGenre';
import CardList from '../components/CardList';
import HorizontalLine from "../components/HorizontalLine.jsx";
import {
    newReleases,
    topHits
} from "../utils/spotifyRequests.js";
import { toast } from 'react-toastify';

function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {};

    useEffect(() => {
        if (state.message) {
            toast.success(state.message);
        
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [state, navigate, location.pathname]);


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