import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import React from 'react';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import SignupPage from './pages/Register/SignupPage.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import SearchResultsPage from './pages/SearchResults/SearchResultsPage.jsx';
import MusicPlayerPage from './pages/MusicPlayer/MusicPlayerPage.jsx';
import AccountPage from './pages/Account/AccountPage.jsx';
import LibraryPage from './pages/Library/LibraryPage.jsx';
import ArtistPage from './pages/Artist/ArtistPage.jsx';
import NotFoundPage from './pages/NotFound/NotFoundPage.jsx';
import PlaylistPage from "./pages/Playlist/PlaylistPage.jsx";

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
                    <Route path='/signup' element={<SignupPage/>}/>
                    <Route path='/search' element={<SearchResultsPage/>}/>
                    <Route path='/player' element={<MusicPlayerPage/>}/>
                    <Route path='/playlist' element={<PlaylistPage/>}/>
                    <Route path='/artist' element={<ArtistPage/>}/>
                    <Route path='/account' element={<AccountPage/>}/>
                    <Route path='/library' element={<LibraryPage/>}/>
                    <Route path='/*' element={<NotFoundPage/>}/>
                </Routes>
                <Footer theme={theme}/>
            </BrowserRouter>
        </>
    );
}

export default App;
