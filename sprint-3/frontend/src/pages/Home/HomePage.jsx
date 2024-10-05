import React from 'react';
import Hero from '../../components/Hero/Hero.jsx';
import GenresList from '../../components/GenresList/GenresList.jsx';
import CardList from '../../components/CardList/CardList.jsx';
import HorizontalLine from "../../components/HorizontalLine/HorizontalLine.jsx";
import {useSpotifyGet} from "../../hooks/useSpotifyGet.jsx";

function HomePage() {
    const {data: newReleases, error: newReleasesError} = useSpotifyGet("/api/spotify/new-releases");
    const {data: topHits, error: topHitsError} = useSpotifyGet("/api/spotify/top-hits");
    const {data: genres, error: genresError} = useSpotifyGet("/api/spotify/genres");

    return (
        <>
            <Hero/>
            <CardList title="New Releases" items={newReleases} error={newReleasesError}/>
            <HorizontalLine/>
            <CardList title="Top Hits" items={topHits} error={topHitsError}/>
            <HorizontalLine/>
            <GenresList genres={genres} error={genresError}/>
        </>
    )
}

export default HomePage;
