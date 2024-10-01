import React, {useEffect, useState} from 'react'
import Hero from '../components/Hero';
import BrowseByGenre from '../components/BrowseByGenre';
import CardList from '../components/CardList';
import HorizontalLine from "../components/HorizontalLine.jsx";
import {useSpotifyGet} from "../hooks/useSpotifyGet.jsx";

function HomePage() {
    const newReleases = useSpotifyGet("/api/spotify/new-releases");
    const topHits = useSpotifyGet("/api/spotify/top-hits");

    return (
        <>
            <Hero/>
            <CardList title="New Releases" items={newReleases} />
            <HorizontalLine/>
            <CardList title="Top Hits" items={topHits} />
            <HorizontalLine/>
            <BrowseByGenre/>
        </>
    )
}

export default HomePage