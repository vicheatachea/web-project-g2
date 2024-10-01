import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer({ theme }) {
    return (
        <footer className={`${styles.sickbeatFooter} ${theme}`}>
            <div className={styles.footerContent}>
                <nav>
                    <ul className={styles.footerNav}>
                        <div className={styles.rights}>&copy; 2024 SickBeat.<br/> All rights reserved</div>
                        <li className={styles.companySection}>
                            <Link to="#"><b>Company</b></Link>
                            <div className={styles.companyItems}>
                                <Link to="#" className={styles.navText}>About Us</Link>
                                <Link to="#" className={styles.navText}>Career Opportunities</Link>
                                <Link to="#" className={styles.navText}>Objectives</Link>
                            </div>
                        </li>
                        <li className={styles.helpSection}>
                            <Link to="#"><b>Help</b></Link>
                            <div className={styles.helpItems}>
                                <Link to="#" className={styles.navText}>Customer Support</Link>
                                <Link to="#" className={styles.navText}>Terms & Conditions</Link>
                                <Link to="#" className={styles.navText}>Privacy Policy</Link>
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
