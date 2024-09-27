import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage.jsx';
import './App.css';
import SearchResultsPage from './pages/SearchResultsPage.jsx';
import MusicPlayerPage from './pages/MusicPlayerPage.jsx';

function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.className = newTheme; // Apply the theme to the body
    };

    return (
        <BrowserRouter>
            <Header theme={theme} toggleTheme={toggleTheme}/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/signup' element={<RegisterPage/>}/>
                <Route path='/search' element={<SearchResultsPage/>}/>
                <Route path='/player' element={<MusicPlayerPage/>}/>
            </Routes>
            <Footer theme={theme}/>
        </BrowserRouter>
    );
}

export default App;
