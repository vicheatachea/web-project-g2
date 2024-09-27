import React, { useState } from "react";
import "./Login.css"; // Import the CSS file
import { useLogin } from "../hooks/useLogin";
import { useField } from "../hooks/useField";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const emailField = useField("text");
	const passwordField = useField("password");
	const { login } = useLogin();
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
		<div className='login-container'>
			<div className='login-box'>
				<h2 className='login-title'>Login</h2>
				<form onSubmit={handleLogin}>
					<input
						type={emailField.type}
						placeholder='EMAIL'
						value={emailField.value}
						onChange={emailField.onChange}
						className='input-field'
						autoComplete='current-email'
						required={true}
					/>
					<input
						type={passwordField.type}
						placeholder='PASSWORD'
						value={passwordField.value}
						onChange={passwordField.onChange}
						className='input-field'
						autoComplete='current-password'
						required={true}
					/>
					<button type='submit' className='submit-button'>
						LOG IN →
					</button>
				</form>
				<div className='link-container'>
					<p>
						Don't have an account already?{" "}
						<a href='/register' className='link'>
							Click here to sign up
						</a>
					</p>
					<p>
						<a href='/forgot-password' className='link'>
							Forgot your password?
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
