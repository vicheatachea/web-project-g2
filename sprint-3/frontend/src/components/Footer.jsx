import React from 'react';
import styles from './Footer.module.css';
<<<<<<< HEAD
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
=======
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';
>>>>>>> frontend-functionality

function Footer({ theme }) {
    return (
        <footer className={`${styles.sickbeatFooter} ${theme}`}>
            <div className={styles.footerContent}>
                <nav>
                    <ul className={styles.footerNav}>
                        <div className={styles.rights}>&copy; 2024 SickBeat.<br/> All rights reserved</div>
                        <li className={styles.companySection}>
                            <a href="#"><b>Company</b></a>
                            <div className={styles.companyItems}>
<<<<<<< HEAD
                                <a href="#" className={styles.navText}>About Us</a>
                                <a href="#" className={styles.navText}>Career Opportunities</a>
                                <a href="#" className={styles.navText}>Objectives</a>
=======
                                <a href="" className="nav-text">About Us</a>
                                <a href="" className="nav-text">Career Opportunities</a>
                                <a href="" className="nav-text">Objectives</a>
>>>>>>> frontend-functionality
                            </div>
                        </li>
                        <li className={styles.helpSection}>
                            <a href="#"><b>Help</b></a>
                            <div className={styles.helpItems}>
<<<<<<< HEAD
                                <a href="#" className={styles.navText}>Customer Support</a>
                                <a href="#" className={styles.navText}>Terms & Conditions</a>
                                <a href="#" className={styles.navText}>Privacy Policy</a>
=======
                                <a href="" className="nav-text">Customer Support</a>
                                <a href="" className="nav-text">Terms & Conditions</a>
                                <a href="" className="nav-text">Privacy Policy</a>
>>>>>>> frontend-functionality
                            </div>
                        </li>
                        <div className={styles.socialSection}>
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
