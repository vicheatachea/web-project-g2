import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx';
import MusicPlayerPage from './pages/MusicPlayerPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import ArtistPage from './pages/ArtistPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.className = newTheme; // Apply the theme to the body
    };

    return (
        <>
            <BrowserRouter>
                <Header theme={theme} toggleTheme={toggleTheme}/>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/signup' element={<RegisterPage/>}/>
                    <Route path='/search' element={<SearchResultsPage/>}/>
                    <Route path='/artist' element={<ArtistPage/>}/>
                    <Route path='/player' element={<MusicPlayerPage/>}/>
                    <Route path='/account' element={<AccountPage/>}/>
                    <Route path='/library' element={<LibraryPage/>}/>
                    <Route path='/notfound' element={<NotFoundPage/>}/>
                </Routes>
                <Footer theme={theme}/>
            </BrowserRouter>
        </>
    );
}

export default App;
