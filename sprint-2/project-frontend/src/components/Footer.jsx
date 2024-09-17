import React from 'react';
import './Footer.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';


function Footer({theme}) {
    return (
        <footer className={`sickbeat-footer ${theme}`}>
            <div className="footer-content">
                <nav>
                    <ul className="footer-nav">
                        <div className="rights">&copy; 2024 SickBeat.<br/> All rights reserved</div>
                        <li className="company-section">
                            <a href="#"><b>Company</b></a>
                            <div className="company-items">
                                <a href="" className="nav-text">About Us</a>
                                <a href="" className="nav-text">Career Opportunities</a>
                                <a href="" className="nav-text">Objectives</a>
                            </div>
                        </li>
                        <li className="help-section">
                            <a href="#"><b>Help</b></a>
                            <div className="help-items">
                                <a href="" className="nav-text">Customer Support</a>
                                <a href="" className="nav-text">Terms & Conditions</a>
                                <a href="" className="nav-text">Privacy Policy</a>
                            </div>
                        </li>
                        <div className="social-section">
                            <li><a href="#"><FontAwesomeIcon icon={faFacebook} size="lg"/></a></li>
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

