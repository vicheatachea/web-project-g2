import React from 'react'
import Hero from '../components/Hero';
import NewReleases from '../components/NewReleases';
import TopHits from '../components/TopHits';
import BrowseByGenre from '../components/BrowseByGenre';

function HomePage() {
    return (
        <div>
            <Hero/>
            <NewReleases/>
            <TopHits/>
            <BrowseByGenre/>
        </div>
    )
}

export default HomePage