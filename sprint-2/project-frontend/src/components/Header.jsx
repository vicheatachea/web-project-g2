import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBell, faUser, faBars } from '@fortawesome/free-solid-svg-icons';

function Header({ theme, toggleTheme }) {
    const [dropdownVisible, setDropdownVisible] = React.useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

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
                        <a href="#" onClick={toggleDropdown}>
                            <FontAwesomeIcon icon={faBars} size='lg'/>
                        </a>
                        {dropdownVisible && (
                            <div className="dropdown-menu">
                                <button className="mode-button" onClick={toggleTheme}>Light/Dark</button>
                                <button className="my-profile-button">My profile</button>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
