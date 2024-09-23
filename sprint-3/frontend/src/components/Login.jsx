import React, { useState } from "react";
import "./Login.css"; // Import the CSS file
import { loginUser } from "../utils/userRequests";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await loginUser({
				email,
				password,
			});
			console.log("Response:", response);
			navigate("/");
		} catch (err) {
			console.error("Error:", err["response"]["data"]);
		}

		//console.log("Email:", email);
		//console.log("Password:", password);
	};

	return (
		<div className='login-container'>
			<div className='login-box'>
				<h2 className='login-title'>Login</h2>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='EMAIL'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='input-field'
					/>
					<input
						type='password'
						placeholder='PASSWORD'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='input-field'
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
