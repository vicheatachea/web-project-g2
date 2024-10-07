import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBell,
	faUser,
	faSun,
	faMoon,
} from "@fortawesome/free-solid-svg-icons";

import Cookies from "js-cookie";

function Header({ theme, toggleTheme, isAuthenticated, setIsAuthenticated }) {
	const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setShowDropdown(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownRef]);

	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleKeyDown = async (e) => {
		if (e.key === "Enter" && searchQuery) {
			e.preventDefault();
			navigate(`/search?q=${searchQuery}`);
		}
	};

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const handleLogout = () => {
		Cookies.remove("jwt");
		setIsAuthenticated(false);
		navigate("/", { state: { message: "Logout successful!" } });
	};

	return (
		<header className={`${styles.sickbeatHeader} ${theme}`}>
			<Link to='/' className={styles.logo}>
				SickBeat
			</Link>
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
					<Link to='' className='a'>
						<li>
							<FontAwesomeIcon icon={faBell} size='lg' />
						</li>
					</Link>

					{isAuthenticated ? (
						<div
							className={styles.dropdownContainer}
							ref={dropdownRef}
						>
							<Link to='#' className='a' onClick={toggleDropdown}>
								<li>
									<FontAwesomeIcon icon={faUser} size='lg' />
								</li>
							</Link>
							{showDropdown && (
								<div className={styles.dropdownMenu}>
									<Link
										to='/account'
										className={styles.dropdownItem}
									>
										<button
											className={styles.dropdownButton}
											onClick={toggleDropdown}
										>
											Account
										</button>
									</Link>

									<Link
										to='/playlists'
										className={styles.dropdownItem}
									>
										<button
											className={styles.dropdownButton}
											onClick={toggleDropdown}
										>
											Playlists
										</button>
									</Link>

									<button
										onClick={() => {
											handleLogout();
											toggleDropdown();
										}}
										className={styles.dropdownButton}
									>
										Logout
									</button>
								</div>
							)}
						</div>
					) : (
						<Link to='/login' className='a'>
							<li>
								<FontAwesomeIcon icon={faUser} size='lg' />
							</li>
						</Link>
					)}

					<li onClick={toggleTheme}>
						{theme === "light" ? (
							<FontAwesomeIcon icon={faMoon} size='lg' />
						) : (
							<FontAwesomeIcon icon={faSun} size='lg' />
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
