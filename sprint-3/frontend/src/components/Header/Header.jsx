import React from "react";
import styles from "./Header.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faUser, faSun, faMoon} from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
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
        <header className={`${styles.header} ${theme}`}>
            <Link to='/' className={styles.logo}>SickBeat</Link>
            <div className={styles.searchbar}>
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
                    <li><Link to=""><FontAwesomeIcon icon={faBell} size="lg"/></Link></li>
                    <li><Link to="/login"><FontAwesomeIcon icon={faUser} size='lg'/></Link></li>
                    <li>
                        <button className={styles.themeButton} onClick={toggleTheme}>
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
