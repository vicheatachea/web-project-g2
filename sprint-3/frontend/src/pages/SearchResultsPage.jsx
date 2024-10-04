import React from 'react'
import CardList from "../components/CardList.jsx";
import {useSearchParams} from "react-router-dom";
import HorizontalLine from "../components/HorizontalLine.jsx";
import ConnectPrompt from "../components/ConnectPrompt.jsx";
import {useSpotifyGet} from "../hooks/useSpotifyGet.jsx";

function SearchResultsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q");

    const {data: searchTrack,
        error: searchTrackError
    } = useSpotifyGet(`/api/spotify/search?q=${query}&type=track`);
    const {data: searchArtist,
        error: searchArtistError
    } = useSpotifyGet(`/api/spotify/search?q=${query}&type=artist`);
    const {data: searchAlbum,
        error: searchAlbumError
    } = useSpotifyGet(`/api/spotify/search?q=${query}&type=album`);
    const {
        data: searchPlaylist,
        error: searchPlaylistError
    } = useSpotifyGet(`/api/spotify/search?q=${query}&type=playlist`);

    return (
        <>
            {searchTrackError === 401 ? (
                <ConnectPrompt/>
            ) : searchTrackError ? (
                <p>Add another error</p>
            ) : (
                <CardList title="Tracks" items={searchTrack}/>
            )}
            <HorizontalLine/>
            {searchArtistError === 401 ? (
                <ConnectPrompt/>
            ) : searchArtistError ? (
                <p>Add another error</p>
            ) : (
                <CardList title="Artists" items={searchArtist}/>
            )}
            <HorizontalLine/>
            {searchAlbumError === 401 ? (
                <ConnectPrompt/>
            ) : searchAlbumError ? (
                <p>Add another error</p>
            ) : (
                <CardList title="Albums" items={searchAlbum}/>
            )}
            <HorizontalLine/>
            {searchPlaylistError === 401 ? (
                <ConnectPrompt/>
            ) : searchPlaylistError ? (
                <p>Add another error</p>
            ) : (
                <CardList title="Playlists" items={searchPlaylist}/>
            )}
        </>
    )
}

export default SearchResultsPage