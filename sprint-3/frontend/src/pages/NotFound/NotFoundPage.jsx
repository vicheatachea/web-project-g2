import {Link} from 'react-router-dom';
import {FaExclamationTriangle} from 'react-icons/fa';
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
    return (
        <section className={styles.notFoundContainer}>
            <FaExclamationTriangle className={styles.triangle}/>
            <h1 className={styles.notFound}>404 Not Found</h1>
            <p className={styles.notFoundPage}>This page does not exist</p>
            <Link className={styles.backHome} to='/'>Go Back</Link>
        </section>
    );
};
export default NotFoundPage;
