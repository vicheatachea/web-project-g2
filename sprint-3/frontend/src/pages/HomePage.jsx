import React from 'react'
import Hero from '../components/Hero';
import NewReleases from '../components/NewReleases';
import TopHits from '../components/TopHits';
import BrowseByGenre from '../components/BrowseByGenre';
import CardList from '../components/CardList';

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

    const searchResults = [];

    const topHits = [];

    return (
        <div>
            <Hero/>
            <NewReleases/>
            <TopHits/>
            <BrowseByGenre/>
            <CardList title="New Releases" items={newReleases} />
            <CardList title="Search Results" items={searchResults} />
            <CardList title="Top Hits" items={topHits} />
        </div>
    )
}

export default HomePage