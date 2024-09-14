import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NewReleases from './components/NewReleases';
import TopHits from './components/TopHits';
import BrowseByGenre from './components/BrowseByGenre';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home';
import './App.css';

function App() {
    const [theme, setTheme] = useState('light');
  
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.body.className = newTheme; // Apply the theme to the body
    };

    return (

        <div className={`app ${theme}`}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <Router>
                <Routes>
                    
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<RegisterPage />} /> 
                    
                </Routes>
            </Router>
            <Hero />
            <NewReleases />
            <TopHits />
            <BrowseByGenre theme={theme} />
            
            <Footer theme={theme} />
        </div> 
    );
}

export default App;
