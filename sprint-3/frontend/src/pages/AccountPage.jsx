import React, { useEffect, useState } from "react";
import styles from "./AccountPage.module.css";
import accountPicture from "../images/the-rock.jpg";
import { getUser, updateUser, deleteUser } from "../utils/userRequests";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountPage = ({ theme }) => {
	const [initialUsername, setInitialUsername] = useState("");
	const [initialEmail, setInitialEmail] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [emailTouched, setEmailTouched] = useState(false);
	const [usernameTouched, setUsernameTouched] = useState(false);
	const navigate = useNavigate();

	const token = Cookies.get("jwt");
	const user = JSON.parse(atob(token.split(".")[1]));
	const userId = user.userId;

	useEffect(() => {
		const getUserData = async () => {
			try {
				const response = await getUser();
				const data = response.data;
				setInitialUsername(data.username);
				setInitialEmail(data.email);
				setUsername(data.username);
				setEmail(data.email);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		getUserData(userId);
	}, []);

	const handleSaveChanges = async () => {
		const updatedData = { userId: userId };
		if (window.confirm("Are you sure you want to save changes?")) {
			const trimmedUsername = username.trim();
			const trimmedEmail = email.trim();

			if (
				newPassword &&
				newPassword !== currentPassword &&
				newPassword === confirmPassword &&
				newPassword !== ""
			) {
				updatedData.password = newPassword;
			} else {
				toast.info("Passwords do not match or are empty");
			}

			if (emailTouched && trimmedEmail && trimmedEmail !== initialEmail) {
				updatedData.email = trimmedEmail;
			} else if (emailTouched) {
				toast.info(
					"New email must be different from the current email"
				);
			}

			if (
				usernameTouched &&
				trimmedUsername &&
				trimmedUsername !== initialUsername
			) {
				updatedData.username = trimmedUsername;
			} else if (usernameTouched) {
				toast.info(
					"New username must be different from the current username"
				);
			}

			if (Object.keys(updatedData).length > 1) {
				try {
					const response = await updateUser(updatedData);
					const data = response.data;
					//console.log(data)
					setInitialUsername(data.username);
					setInitialEmail(data.email);
					setCurrentPassword("");
					setNewPassword("");
					setConfirmPassword("");
					toast.success("Changes saved successfully");
				} catch (error) {
					console.error("Error updating user data:", error);
				}
			} else {
				toast.info("No changes detected");
			}
		}
	};

	const handleCancel = () => {
		if (
			window.confirm(
				"Are you sure you want to cancel? Any unsaved changes will be lost."
			)
		) {
			setUsername(initialUsername);
			setEmail(initialEmail);
		}
	};

	const handleDeleteAccount = async () => {
		if (
			window.confirm(
				"Are you sure you want to delete your account? This action cannot be undone."
			)
		) {
			try {
				const response = await deleteUser();
				if (response.status === 204) {
					Cookies.remove("jwt");
					navigate("/", {
						state: { message: "Account deleted successfully" },
					});
				}
			} catch {
				toast.error("Failed to delete account");
			}
		}
	};

	const accountProfile = accountPicture;

	return (
		<div className={`${styles.accountPage} account-page ${theme}`}>
			<h1>My Account</h1>
			{/* Account Picture Section */}
			<div className={styles.pictureSection}>
				<h2>Account Picture</h2>
				<img
					className={styles.accountPicture}
					src={accountProfile}
					alt='Account'
				/>
			</div>
			{/*  the real return call for changing account profile
          <div className={styles.pictureSection}>
            <h2>Account Picture</h2>
            <img className={styles.accountPicture} src={preview || '/images/default.jpg'} alt="Account" />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button className={styles.pictureButton} onClick={handleImageUpload}>Change Picture</button>
            </div> */}

			{/* Basic Information Section */}
			<div className={styles.infoSection}>
				<h2>Basic Information</h2>
				<label>Username:</label>
				<input
					className={styles.text}
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
						if (e.target.value !== initialUsername) {
							setUsernameTouched(true);
						} else {
							setUsernameTouched(false);
						}
					}}
				/>

				<label>Email:</label>
				<input
					className={styles.email}
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						if (e.target.value !== initialEmail) {
							setEmailTouched(true);
						} else {
							setEmailTouched(false);
						}
					}}
				/>
			</div>

			{/* Password Management Section */}
			<div className={styles.passwordSection}>
				<h2>Password Management</h2>
				<label>Current Password:</label>
				<input
					className={styles.password}
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>

				<label>New Password:</label>
				<input
					className={styles.password}
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>

				<label>Confirm Password:</label>
				<input
					className={styles.password}
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</div>

			{/* Save/Cancel Buttons */}
			<div className={styles.saveCancelSection}>
				<button
					className={styles.saveButton}
					onClick={handleSaveChanges}
				>
					Save Changes
				</button>
				<button className={styles.cancelButton} onClick={handleCancel}>
					Cancel
				</button>
			</div>

			{/* Delete Account Section */}
			<div className={styles.deleteSection}>
				<button
					className={styles.deleteAccount}
					onClick={handleDeleteAccount}
				>
					Delete Account
				</button>
			</div>
		</div>
	);
};

export default AccountPage;
