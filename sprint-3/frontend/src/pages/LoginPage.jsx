import React, { useState } from "react";
import styles from "./LoginPage.module.css"; // Import the CSS file
import { useLogin } from "../hooks/useLogin";
import { useField } from "../hooks/useField";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = ({ setIsAuthenticated }) => {
	const emailField = useField("text");
	const passwordField = useField("password");
	const { login } = useLogin();
	const Navigate = useNavigate();

	const handleLogin = async () => {
		try {
			if (emailField.value !== "" && passwordField.value !== "") {
				/*console.log(
					"Email:",
					emailField.value,
					"Password:",
					passwordField.value
				);*/
				login(emailField.value, passwordField.value);
				setIsAuthenticated(true);
				Navigate("/", { state: { message: "Login successful" } });
			} else {
				toast.error("Please fill in all fields");
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
						<Link to='/register' className={styles.link}>
							Click here to sign up
						</Link>
					</p>
					<p>
						<Link to='/forgot-password' className={styles.link}>
							Forgot your password?
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
