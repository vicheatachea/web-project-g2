import React from "react";
import styles from "./Header.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faUser, faBars} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Header({theme, toggleTheme}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && searchQuery) {
            e.preventDefault();
            console.log('Search query:', searchQuery);
        }

        /*
        try {
            const response = await searchSpotify(searchQuery);
            console.log("Response:", response);
            Navigate(`/search/"${searchQuery}`);
        } catch (err) {
            console.error("Error:", err["response"]["data"]);
        }
        */
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
                        <a href="#" onClick={toggleDropdown}>
                            <FontAwesomeIcon icon={faBars} size='lg'/>
                        </a>
                        {dropdownVisible && (
                            <div className={styles.dropdownMenu}>
                                <button className="mode-button" onClick={toggleTheme}>Light/Dark</button>
                                <button className="library-button" onClick={() => navigate('/library')}>My Library
                                </button>
                                <button className="account-button" onClick={() => navigate('/account')}>My Account
                                </button>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
