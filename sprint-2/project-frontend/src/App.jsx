import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage.jsx';
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
            <Header theme={theme} toggleTheme={toggleTheme}/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/signup' element={<RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
            <Footer theme={theme}/>
        </div>
    );
}

export default App;
