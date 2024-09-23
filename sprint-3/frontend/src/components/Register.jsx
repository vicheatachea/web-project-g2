import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/userRequests";

const Register = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
		}
		try {
			const response = await registerUser({
				username,
				email,
				password,
			});
			console.log("Response:", response);
			navigate("/");
		} catch (err) {
			console.error("Error:", err["response"]["data"]);
		}

		//console.log("Email:", email);
		//console.log("Username:", username);
		//console.log("Password:", password);
		//console.log("Confirm Password:", confirmPassword);
	};

	return (
		<div className='register-container'>
			<div className='register-box'>
				<h2 className='register-title'>Register</h2>
				<form onSubmit={handleSubmit}>
					<div className='input-group'>
						<input
							type='email'
							placeholder='EMAIL'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='input-field'
							required
						/>
					</div>
					<div className='input-group'>
						<input
							type='text'
							placeholder='USERNAME'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className='input-field'
							required
						/>
					</div>
					<div className='input-group'>
						<input
							type='password'
							placeholder='PASSWORD'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='input-field'
							required
						/>
					</div>
					<div className='input-group'>
						<input
							type='password'
							placeholder='CONFIRM PASSWORD'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className='input-field'
							required
						/>
					</div>
					<button type='submit' className='submit-button'>
						REGISTER →
					</button>
				</form>
				<div className='link-container'>
					<p>
						Already have an account?{" "}
						<a href='/login' className='link'>
							Click here to Log in
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
