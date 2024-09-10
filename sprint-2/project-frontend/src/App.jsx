import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import './App.css';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <div className="App">
            
            <Router>
                <Routes>
                    
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<LoginPage />} />
                    
                </Routes>
            </Router>
        </div>
    );
}

export default App;
