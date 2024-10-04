import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { useLocation, useNavigate } from "react-router-dom";
import BrowseByGenre from "../components/BrowseByGenre";
import CardList from "../components/CardList";
import HorizontalLine from "../components/HorizontalLine.jsx";
import ConnectPrompt from "../components/ConnectPrompt.jsx";
import { useSpotifyGet } from "../hooks/useSpotifyGet.jsx";
import { toast } from "react-toastify";

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

	const { data: newReleases, error: newReleasesError } = useSpotifyGet(
		"/api/spotify/new-releases"
	);
	const { data: topHits, error: topHitsError } = useSpotifyGet(
		"/api/spotify/top-hits"
	);
	const { data: genres, error: genresError } = useSpotifyGet(
		"/api/spotify/genres"
	);

	return (
		<>
			<Hero />
			{newReleasesError === 401 ? (
				<ConnectPrompt />
			) : newReleasesError ? (
				<p>Add another error</p>
			) : (
				<CardList title='New Releases' items={newReleases} />
			)}
			<HorizontalLine />
			{topHitsError === 401 ? (
				<ConnectPrompt />
			) : topHitsError ? (
				<p>Add another error</p>
			) : (
				<CardList title='Top Hits' items={topHits} />
			)}
			<HorizontalLine />
			{genresError === 401 ? (
				<ConnectPrompt />
			) : genresError ? (
				<p>Add another error</p>
			) : (
				<BrowseByGenre genres={genres} />
			)}
		</>
	);
}

export default HomePage;
