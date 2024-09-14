import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


function Footer({ theme }) {
    return (
        <footer className={`sickbeat-footer ${theme}`}>
            <div className="footer-content">
                <nav>
                    <ul className="footer-nav">
                    <div className="rights">&copy; 2024 SickBeat. All rights reserved</div>
                        <li className="company-section">
                            <a href="#">Company</a>
                            <div className="company-items">
                                <div className="nav-text">About</div>
                                <div className="nav-text">Features</div>
                                <div className="nav-text">Works</div>
                                <div className="nav-text">Career</div>
                            </div>
                        </li>
                        <li className="help-section">
                            <a href="#">Help</a>
                            <div className="help-items">
                                <div className="nav-text">Customer Support</div>
                                <div className="nav-text">Terms & Conditions</div>
                                <div className="nav-text">Privacy Policy</div>
                            </div>
                        </li>
                        <div className="social-section">
                            <li><a href="#"><FontAwesomeIcon icon={faFacebook} size="lg" /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faInstagram} size='lg'/></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faTwitter} size='lg'/></a></li>
                        </div>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;

