import React from "react";
import styles from "./RegisterPage.module.css";
import { useRegister } from "../hooks/useRegister";
import { useField } from "../hooks/useField";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RegisterPage = ({setIsAuthenticated}) => {
	const emailField = useField("email");
	const usernameField = useField("text");
	const passwordField = useField("password");
	const confirmPasswordField = useField("password");
	const { register } = useRegister();
	const Navigate = useNavigate();

	const handleRegister = async () => {
		try {
			if (
				emailField.value !== "" ||
				usernameField.value !== "" ||
				passwordField.value !== "" ||
				confirmPasswordField.value !== ""
			) {
				if (passwordField.value !== confirmPasswordField.value) {
					toast.error("Passwords do not match");
				}

				register(
					usernameField.value,
					emailField.value,
					passwordField.value
				);
                setIsAuthenticated(true);
				Navigate("/", { state: { message: "Registration successful" }});
			} else {
				toast.error("Please fill in all fields");
			}
		} catch (err) {
			console.error("Error:", err);
		}

		//console.log("Email:", email);
		//console.log("Username:", username);
		//console.log("Password:", password);
		//console.log("Confirm Password:", confirmPassword);
	};

	return (
		<div className={`${styles.registerContainer}`}>
			<div className={styles.registerBox}>
				<h2 className={styles.registerTitle}>Register</h2>
				<form onSubmit={handleRegister}>
					<div className={styles.inputGroup}>
						<input
							type={emailField.type}
							placeholder='EMAIL'
							value={emailField.value}
							onChange={emailField.onChange}
							className={styles.inputField}
							autoComplete='current-email'
							required={true}
						/>
					</div>
					<div className={styles.inputGroup}>
						<input
							type={usernameField.type}
							placeholder='USERNAME'
							value={usernameField.value}
							onChange={usernameField.onChange}
							className={styles.inputField}
							autoComplete='current-username'
							required={true}
						/>
					</div>
					<div className={styles.inputGroup}>
						<input
							type={passwordField.type}
							placeholder='PASSWORD'
							value={passwordField.value}
							onChange={passwordField.onChange}
							className={styles.inputField}
							autoComplete='current-password'
							required={true}
						/>
					</div>
					<div className={styles.inputGroup}>
						<input
							type={confirmPasswordField.type}
							placeholder='CONFIRM PASSWORD'
							value={confirmPasswordField.value}
							onChange={confirmPasswordField.onChange}
							className={styles.inputField}
							autoComplete='current-password'
							required={true}
						/>
					</div>
					<button type='submit' className={styles.submitButton}>
						REGISTER →
					</button>
				</form>
				<div className={styles.linkContainer}>
					<p>
						Already have an account?{" "}
						<Link to='/login' className={styles.link}>
							Click here to Log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
