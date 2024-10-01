import React, {useState} from 'react'
import styles from './Register.module.css'

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your submit logic here
        console.log("Email:", email);
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Confirm Password:", confirmPassword);
    };

    return (
        <div className={`${styles.registerContainer}`}>
            <div className={styles.registerBox}>
                <h2 className={styles.registerTitle}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            placeholder="EMAIL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="USERNAME"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="CONFIRM PASSWORD"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        REGISTER →
                    </button>
                </form>
                <div className={styles.linkContainer}>
                    <p>
                        Already have an account?{" "}
                        <a href="/login" className={styles.link}>
                            Click here to Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage
