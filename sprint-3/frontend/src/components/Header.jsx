import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBell, faUser, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function Header({ theme, toggleTheme }) {
<<<<<<< HEAD
=======
    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

>>>>>>> frontend-functionality
    return (
        <header className={`${styles.sickbeatHeader} ${theme}`}>
            <a href='/' className={styles.logo}>SickBeat</a>
            <div className={styles.searchContainer}>
                <input type="text" placeholder="Search..."/>
            </div>
            <nav className={styles.navbar}>
                <ul className={styles.iconList}>
                    <li><a href=""><FontAwesomeIcon icon={faBell} size="lg" /></a></li>
                    <li><a href="/login"><FontAwesomeIcon icon={faUser} size='lg'/></a></li>
                    <li>
<<<<<<< HEAD
                        <button className="mode-button" onClick={toggleTheme}>
                            {theme === 'light' ? (
                                <FontAwesomeIcon icon={faMoon} size="lg" />
                            ) : (
                                <FontAwesomeIcon icon={faSun} size="lg" />
                            )}
                        </button>
=======
                        <a href="#" onClick={toggleDropdown}>
                            <FontAwesomeIcon icon={faBars} size='lg'/>
                        </a>
                        {dropdownVisible && (
                            <div className={styles.dropdownMenu}>
                                <button className="mode-button" onClick={toggleTheme}>Light/Dark</button>
                                <button className="library-button" onClick={() => navigate('/library')}>My Library</button>
                                <button className="account-button" onClick={() => navigate('/account')}>My Account</button>
                            </div>
                        )}
>>>>>>> frontend-functionality
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
