import React, { useEffect, useState } from "react";
import styles from "./AccountPage.module.css";
import accountPicture from "../images/the-rock.jpg";
import { getUser, updateUser, deleteUser } from "../utils/userRequests";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useField } from "../hooks/useField";

const AccountPage = ({ theme }) => {
	const usernameField = useField("text");
	const emailField = useField("email");
	const newPasswordField = useField("password");
	const confirmPasswordField = useField("password");

	const [initialUsername, setInitialUsername] = useState("");
	const [initialEmail, setInitialEmail] = useState("");

	const [touchedUsername, setTouchedUsername] = useState(false);
	const [touchedEmail, setTouchedEmail] = useState(false);
	const [touchedNewPassword, setTouchedNewPassword] = useState(false);
	const [touchedConfirmPassword, setTouchedConfirmPassword] = useState(false);

	const navigate = useNavigate();

	const token = Cookies.get("jwt");
	const user = JSON.parse(atob(token.split(".")[1]));
	const userId = user.userId;

	useEffect(() => {
		const getUserData = async () => {
			try {
				const response = await getUser();
				const data = response.data;
				console.log(data);
				setInitialUsername(data.username);
				setInitialEmail(data.email);
				usernameField.setValue(data.username);
				emailField.setValue(data.email);
				newPasswordField.setValue("");
				confirmPasswordField.setValue("");
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		getUserData(userId);
	}, []);

	const handleSaveChanges = async () => {
		const updatedData = { userId: userId };
		if (window.confirm("Are you sure you want to save changes?")) {
			if (
				newPasswordField.value &&
				newPasswordField.value === confirmPasswordField.value &&
				newPasswordField.value !== ""
			) {
				updatedData.password = newPasswordField.value;
			} else if (newPasswordField.value !== confirmPasswordField.value) {
				toast.error("Passwords do not match");
			} else if (newPasswordField.value === "") {
				toast.error("New password cannot be empty!");
			} else {
			}

			if (emailField.value !== initialEmail) {
				updatedData.email = emailField.value;
			} else if (emailField.value === "") {
				toast.error("Email cannot be empty");
			} else if (emailField.value === initialEmail) {
				toast.error("Email must be different from current email!");
			}

			if (usernameField.value !== initialUsername) {
				updatedData.username = usernameField.value;
			} else if (usernameField.value === "") {
				toast.error("Username cannot be empty");
			} else if (usernameField.value === initialUsername) {
				toast.error(
					"Username must be different from current username!"
				);
			}

			if (Object.keys(updatedData).length > 1) {
				try {
					const response = await updateUser(updatedData);
					const data = response.data;
					console.log(data);
					setInitialUsername(data.username);
					setInitialEmail(data.email);
					newPasswordField.reset();
					confirmPasswordField.reset();
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
			usernameField.setValue(initialUsername);
			emailField.setValue(initialEmail);
			newPasswordField.setValue("");
			confirmPasswordField.setValue("");
			setTouchedUsername(false);
			setTouchedEmail(false);
			setTouchedNewPassword(false);
			setTouchedConfirmPassword(false);
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
					Cookies.remove("jwt").then(
						navigate("/", {
							state: { message: "Account deleted successfully" },
						})
					);
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
					type={usernameField.type}
					className={styles.text}
					value={usernameField.value}
					onChange={usernameField.onChange}
				/>

				<label>Email:</label>
				<input
					type={emailField.type}
					className={styles.email}
					value={emailField.value}
					onChange={emailField.onChange}
				/>

				{/* Password Management Section */}
				<div className={styles.passwordSection}>
					<h2>Password Management</h2>

					<label>New Password:</label>
					<input
						type={newPasswordField.type}
						className={styles.password}
						value={newPasswordField.value}
						onChange={newPasswordField.onChange}
					/>

					<label>Confirm Password:</label>
					<input
						type={confirmPasswordField.type}
						className={styles.password}
						value={confirmPasswordField.value}
						onChange={confirmPasswordField.onChange}
					/>
				</div>
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
