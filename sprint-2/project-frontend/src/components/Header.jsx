import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
            <header className="header">
            <div className="logo">SickBeat</div>
            <div className="search-container">
            <input type="text" placeholder="Search..."/>
            </div>
            <nav className="nav">
            <ul>
                <li><a href="#"><FontAwesomeIcon icon={faBell} size="lg" /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faUser} size='lg'/></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faBars} size='lg'/></a></li>
            </ul>
            </nav>
        </header>
        
    );
}

export default Header;
