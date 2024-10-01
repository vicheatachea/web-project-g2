import React from 'react'
import Hero from '../components/Hero';
import BrowseByGenre from '../components/BrowseByGenre';
import CardList from '../components/CardList';
import HorizontalLine from "../components/HorizontalLine.jsx";
import LoginPrompt from "../components/LoginPrompt.jsx";
import {useSpotifyGet} from "../hooks/useSpotifyGet.jsx";

function HomePage() {
    const {data: newReleases, error: newReleasesError} = useSpotifyGet("/api/spotify/new-releases");
    const {data: topHits, error: topHitsError} = useSpotifyGet("/api/spotify/top-hits");
    const {data: genres, error: genresError} = useSpotifyGet("/api/spotify/genres");

    return (
        <>
            <Hero/>
            {newReleasesError === 401 ? (
                <LoginPrompt/>
            ) : newReleasesError ? (
                <p>Add another error</p>
            ) : (
                <CardList title="New Releases" items={newReleases}/>
            )}
            <HorizontalLine/>
            {topHitsError === 401 ? (
                <LoginPrompt/>
            ) : topHitsError ? (
                <p>Add another error</p>
            ) : (
                <CardList title="Top Hits" items={topHits}/>
            )}
            <HorizontalLine/>
            {genresError === 401 ? (
                <LoginPrompt/>
            ) : genresError ? (
                <p>Add another error</p>
            ) : (
                <BrowseByGenre genres={genres}/>
            )}
        </>
    )
}

export default HomePage
