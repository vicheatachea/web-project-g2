import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ theme, toggleTheme }) {
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
		<header className={`sickbeat-header ${theme}`}>
			<a href='/' className='logo'>
				SickBeat
			</a>
			<div className='search-container'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                     
                />
            </div>
			<nav className='navbar'>
				<ul className='icon-list'>
					<li>
						<a href=''>
							<FontAwesomeIcon icon={faBell} size='lg' />
						</a>
					</li>
					<li>
						<a href='/login'>
							<FontAwesomeIcon icon={faUser} size='lg' />
						</a>
					</li>
					<li>
						<a href='#' onClick={toggleDropdown}>
							<FontAwesomeIcon icon={faBars} size='lg' />
						</a>
						{dropdownVisible && (
							<div className='dropdown-menu'>
								<button
									className='mode-button'
									onClick={toggleTheme}
								>
									Light/Dark
								</button>
								<button className='my-profile-button'>
									My profile
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
