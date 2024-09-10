import React from 'react'
import Header from '../components/Header';
import Hero from '../components/Hero';
// import Tabs from './components/Tabs';
import NewReleases from '../components/NewReleases';
import TopHits from '../components/TopHits';
import BrowseByGenre from '../components/BrowseByGenre';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
        <Header />
        <Hero />
        {/* <Tabs /> */}
        <NewReleases />
        <TopHits/>
        <BrowseByGenre />
        <Footer />
    </div>
  )
}

export default Home
