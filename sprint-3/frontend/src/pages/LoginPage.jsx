import React, {useState} from 'react'
import styles from './LoginPage.module.css'

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div className={`${styles.loginContainer}`}>
            <div className={styles.loginBox}>
                <h2 className={styles.loginTitle}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="USERNAME"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.inputField}
                    />
                    <button type="submit" className={styles.submitButton}>
                        LOG IN →
                    </button>
                </form>
                <div className={styles.linkContainer}>
                    <p>
                        Don't have an account already?{" "}
                        <a href="/signup" className={styles.link}>
                            Click here to sign up
                        </a>
                    </p>
                    <p>
                        <a href="/forgot-password" className={styles.link}>
                            Forgot your password?
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage
