import React from 'react'

import Hero from '../components/Hero';
// import Tabs from './components/Tabs';
import NewReleases from '../components/NewReleases';
import TopHits from '../components/TopHits';
import BrowseByGenre from '../components/BrowseByGenre';


function Home() {
  return (
    <div>
        
        <Hero />
        {/* <Tabs /> */}
        <NewReleases />
        <TopHits/>
        <BrowseByGenre />
        
    </div>
  )
}

export default Home
