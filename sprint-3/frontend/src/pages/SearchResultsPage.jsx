import React from 'react'
import CardList from "../components/CardList.jsx";
import {useSearchParams} from "react-router-dom";
import HorizontalLine from "../components/HorizontalLine.jsx";
import {useSpotifyGet} from "../hooks/useSpotifyGet.jsx";

function SearchResultsPage() {
    const [searchParams, setSearchParams]= useSearchParams()
    const query = searchParams.get("q");

    const searchTrack = useSpotifyGet(`/api/spotify/search?q=${query}&type=track`);
    const searchArtist = useSpotifyGet(`/api/spotify/search?q=${query}&type=artist`);
    const searchAlbum = useSpotifyGet(`/api/spotify/search?q=${query}&type=album`);
    const searchPlaylist = useSpotifyGet(`/api/spotify/search?q=${query}&type=playlist`);

    return (
        <>
            <CardList title={"Tracks"} items={searchTrack}/>
            <HorizontalLine/>
            <CardList title={"Artists"} items={searchArtist}/>
            <HorizontalLine/>
            <CardList title={"Albums"} items={searchAlbum}/>
            <HorizontalLine/>
            <CardList title={"Playlists"} items={searchPlaylist}/>
        </>
    )
}

export default SearchResultsPage
