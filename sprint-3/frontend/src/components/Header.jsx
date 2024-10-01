import React from "react";
import styles from "./Header.module.css";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

function Header({ theme, toggleTheme, isAuthenticated, setIsAuthenticated }) {
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
		if (e.key === "Enter" && searchQuery) {
			e.preventDefault();
			console.log("Search query:", searchQuery);
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
			<a href='/' className={styles.logo}>
				SickBeat
			</a>
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
					<li>
						<Link to=''>
							<FontAwesomeIcon icon={faBell} size='lg' />
						</Link>
					</li>
					<li>
						<Link to='/login'>
							<FontAwesomeIcon icon={faUser} size='lg' />
						</Link>
					</li>
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
