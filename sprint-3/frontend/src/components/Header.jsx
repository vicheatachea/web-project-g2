import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBell, faUser, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function Header({ theme, toggleTheme }) {
    return (
        <header className={`sickbeat-header ${theme}`}>
            <a href='/' className="logo">SickBeat</a>
            <div className="search-container">
                <input type="text" placeholder="Search..."/>
            </div>
            <nav className="navbar">
                <ul className="icon-list">
                    <li><a href=""><FontAwesomeIcon icon={faBell} size="lg" /></a></li>
                    <li><a href="/login"><FontAwesomeIcon icon={faUser} size='lg'/></a></li>
                    <li>
                        <button className="mode-button" onClick={toggleTheme}>
                            {theme === 'light' ? (
                                <FontAwesomeIcon icon={faMoon} size="lg" />
                            ) : (
                                <FontAwesomeIcon icon={faSun} size="lg" />
                            )}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
