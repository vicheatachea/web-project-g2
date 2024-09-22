import React from 'react'
import Hero from '../components/Hero';
import NewReleases from '../components/NewReleases';
import TopHits from '../components/TopHits';
import BrowseByGenre from '../components/BrowseByGenre';
import CardList from '../components/CardList';
import HorizontalLine from "../components/HorizontalLine.jsx";

function HomePage() {
    const newReleases = [
        { id: 1, title: 'Album One', imgSrc: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Album Two', imgSrc: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Album Three', imgSrc: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Album Four', imgSrc: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Album Five', imgSrc: 'https://via.placeholder.com/150' },
        { id: 6, title: 'Album Six', imgSrc: 'https://via.placeholder.com/150' },
        { id: 7, title: 'Album Seven', imgSrc: 'https://via.placeholder.com/150' },
        { id: 8, title: 'Album Eight', imgSrc: 'https://via.placeholder.com/150' },
        { id: 9, title: 'Album Nine', imgSrc: 'https://via.placeholder.com/150' },
        { id: 10, title: 'Album Ten', imgSrc: 'https://via.placeholder.com/150' },
        { id: 11, title: 'Album Eleven', imgSrc: 'https://via.placeholder.com/150' },
        { id: 12, title: 'Album Twelve', imgSrc: 'https://via.placeholder.com/150' },
    ];

    const searchResults = [
        { id: 1, title: 'Result One', imgSrc: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Result Two', imgSrc: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Result Three', imgSrc: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Result Four', imgSrc: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Result Five', imgSrc: 'https://via.placeholder.com/150' },
        { id: 6, title: 'Result Six', imgSrc: 'https://via.placeholder.com/150' },
        { id: 7, title: 'Result Seven', imgSrc: 'https://via.placeholder.com/150' },


    ];

    const topHits = [
        { id: 1, title: 'Song One', imgSrc: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Song Two', imgSrc: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Song Three', imgSrc: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Song Four', imgSrc: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Song Five', imgSrc: 'https://via.placeholder.com/150' },
        { id: 6, title: 'Song Six', imgSrc: 'https://via.placeholder.com/150' },
        { id: 7, title: 'Song Seven', imgSrc: 'https://via.placeholder.com/150' },
        { id: 8, title: 'Song Eight', imgSrc: 'https://via.placeholder.com/150' },
        { id: 9, title: 'Song Nine', imgSrc: 'https://via.placeholder.com/150' },
        { id: 10, title: 'Song Ten', imgSrc: 'https://via.placeholder.com/150' },
        { id: 11, title: 'Song Eleven', imgSrc: 'https://via.placeholder.com/150' },
        { id: 12, title: 'Song Twelve', imgSrc: 'https://via.placeholder.com/150' },
        { id: 13, title: 'Song Thirteen', imgSrc: 'https://via.placeholder.com/150' },
        { id: 14, title: 'Song Fourteen', imgSrc: 'https://via.placeholder.com/150' },
    ];

    return (
        <>
            <Hero/>
            <NewReleases/>
            <TopHits/>
            <BrowseByGenre/>
            <HorizontalLine/>
            <CardList title="New Releases" items={newReleases} />
            <HorizontalLine/>
            <CardList title="Search Results" items={searchResults} />
            <HorizontalLine/>
            <CardList title="Top Hits" items={topHits} />
        </>
    )
}

export default HomePage