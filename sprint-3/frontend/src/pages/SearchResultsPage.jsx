import React, {useEffect, useState} from 'react'
import CardList from "../components/CardList.jsx";
import {useSearchParams} from "react-router-dom";
import HorizontalLine from "../components/HorizontalLine.jsx";
import {searchSpotify} from "../utils/spotifyRequests.js";

function SearchResultsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [trackResults, setTrackResults] = useState([]);
    const [artistResults, setArtistResults] = useState([]);
    const [albumResults, setAlbumResults] = useState([]);
    const [playlistResults, setPlaylistResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            for (const type of ["track", "artist", "album", "playlist"]) {
                const searchResultsData = await searchSpotify(searchParams.get("q"), type);

                switch (type) {
                    case "track":
                        setTrackResults(searchResultsData);
                        break;
                    case "artist":
                        setArtistResults(searchResultsData);
                        break;
                    case "album":
                        setAlbumResults(searchResultsData);
                        break;
                    case "playlist":
                        setPlaylistResults(searchResultsData);
                        break;
                    default:
                        break;
                }
            }
        };

        fetchSearchResults();
    }, []);

    return (
        <>
            <CardList title={"Tracks"} items={trackResults}/>
            <HorizontalLine/>
            <CardList title={"Artists"} items={artistResults}/>
            <HorizontalLine/>
            <CardList title={"Albums"} items={albumResults}/>
            <HorizontalLine/>
            <CardList title={"Playlists"} items={playlistResults}/>
        </>
    )
}

export default SearchResultsPage
