import React from 'react'
import Hero from '../../components/Hero/Hero.jsx';
import BrowseByGenre from '../../components/GenresList/GenresList.jsx';
import CardList from '../../components/CardList/CardList.jsx';
import HorizontalLine from "../../components/HorizontalLine/HorizontalLine.jsx";
import ConnectPrompt from "../../components/ConnectPrompt/ConnectPrompt.jsx";
import {useSpotifyGet} from "../../hooks/useSpotifyGet.jsx";

function HomePage() {
    const {data: newReleases, error: newReleasesError} = useSpotifyGet("/api/spotify/new-releases");
    const {data: topHits, error: topHitsError} = useSpotifyGet("/api/spotify/top-hits");
    const {data: genres, error: genresError} = useSpotifyGet("/api/spotify/genres");

    return (
        <>
            <Hero/>
            {newReleasesError === 401 ? (
                <ConnectPrompt/>
            ) : newReleasesError ? (
                <p>Add another error</p>
            ) : (
                <CardList title="New Releases" items={newReleases}/>
            )}
            <HorizontalLine/>
            {topHitsError === 401 ? (
                <ConnectPrompt/>
            ) : topHitsError ? (
                <p>Add another error</p>
            ) : (
                <CardList title="Top Hits" items={topHits}/>
            )}
            <HorizontalLine/>
            {genresError === 401 ? (
                <ConnectPrompt/>
            ) : genresError ? (
                <p>Add another error</p>
            ) : (
                <BrowseByGenre genres={genres}/>
            )}
        </>
    )
}

export default HomePage
