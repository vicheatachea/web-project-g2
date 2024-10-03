import React from "react";
import styles from "./Header.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faUser, faSun, faMoon} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Header({theme, toggleTheme}) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && searchQuery) {
            e.preventDefault();
            navigate(`/search?q=${searchQuery}`);
        }
    };

    return (
        <header className={`${styles.sickbeatHeader} ${theme}`}>
            <a href='/' className={styles.logo}>SickBeat</a>
            <div className={styles.searchContainer}>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <nav className={styles.navbar}>
                <ul className={styles.iconList}>
                    <li><a href=""><FontAwesomeIcon icon={faBell} size="lg"/></a></li>
                    <li><a href="/login"><FontAwesomeIcon icon={faUser} size='lg'/></a></li>
                    <li>
                        <button className="mode-button" onClick={toggleTheme}>
                            {theme === 'light' ? (
                                <FontAwesomeIcon icon={faMoon} size="lg"/>
                            ) : (
                                <FontAwesomeIcon icon={faSun} size="lg"/>
                            )}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
