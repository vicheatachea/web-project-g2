import React from "react";
import {useField} from "../../hooks/useField.jsx";
import {useLogin} from "../../hooks/useLogin.jsx";
import {useNavigate} from "react-router-dom";
import styles from "./LoginPage.module.css";

function LoginPage() {
    const emailField = useField("text");
    const passwordField = useField("password");
    const {login} = useLogin();
    const Navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (emailField.value !== "" && passwordField.value !== "") {
                console.log(
                    "Email:",
                    emailField.value,
                    "Password:",
                    passwordField.value
                );
                login(emailField.value, passwordField.value);
                Navigate("/");
            } else {
                alert("Please fill in all fields");
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <div className={`${styles.loginContainer}`}>
            <div className={styles.loginBox}>
                <h2 className={styles.loginTitle}>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type={emailField.type}
                        placeholder='EMAIL'
                        value={emailField.value}
                        onChange={emailField.onChange}
                        className={styles.inputField}
                        autoComplete='current-email'
                        required={true}
                    />
                    <input
                        type={passwordField.type}
                        placeholder='PASSWORD'
                        value={passwordField.value}
                        onChange={passwordField.onChange}
                        className={styles.inputField}
                        autoComplete='current-password'
                        required={true}
                    />
                    <button type='submit' className={styles.submitButton}>
                        LOG IN →
                    </button>
                </form>
                <div className={styles.linkContainer}>
                    <p>
                        Don't have an account already?{" "}
                        <a href='/signup' className={styles.link}>
                            Click here to sign up
                        </a>
                    </p>
                    <p>
                        <a href='/forgot-password' className={styles.link}>
                            Forgot your password?
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
