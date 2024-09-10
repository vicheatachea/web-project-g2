import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <div className="App">
            <Header />
            <Router>
                <Routes>
                    
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<RegisterPage />} /> 
                    
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
