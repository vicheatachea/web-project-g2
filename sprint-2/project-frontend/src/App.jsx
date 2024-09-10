import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import './App.css';

function App() {
    return (
        <div className="App">
            
            <Router>
                <Routes>
                    
                    <Route path='/' element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
