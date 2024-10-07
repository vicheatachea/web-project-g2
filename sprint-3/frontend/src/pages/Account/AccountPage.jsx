import React, { useEffect, useState } from "react";
import styles from "./AccountPage.module.css";
import profilePicture from "../../images/the-rock.jpg";
import { getUser, updateUser, deleteUser } from "../../utils/userRequests";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useField } from "../../hooks/useField";

const AccountPage = ({ theme, setIsAuthenticated }) => {
	const usernameField = useField("text");
	const emailField = useField("email");
	const newPasswordField = useField("password");
	const confirmPasswordField = useField("password");

	const [initialUsername, setInitialUsername] = useState("");
	const [initialEmail, setInitialEmail] = useState("");
	const [modifiedUsername, setModifiedUsername] = useState(false);
	const [modifiedEmail, setModifiedEmail] = useState(false);
	const [modifiedNewPassword, setModifiedNewPassword] = useState(false);
	const [modifiedConfirmPassword, setModifiedConfirmPassword] =
		useState(false);

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
				usernameField.setValue(data.username);
				emailField.setValue(data.email);
				newPasswordField.setValue("");
				confirmPasswordField.setValue("");
			} catch (error) {
				toast.error("Error fetching user data");
				console.error("Error fetching user data:", error);
			}
		};
		getUserData(userId);
	}, []);

	const resetForm = () => {
		usernameField.setValue(initialUsername);
		emailField.setValue(initialEmail);
		newPasswordField.reset();
		confirmPasswordField.reset();
		setModifiedUsername(false);
		setModifiedEmail(false);
		setModifiedNewPassword(false);
		setModifiedConfirmPassword(false);
	};

	const handleSaveChanges = async () => {
		const updatedData = { userId: userId };
		if (!window.confirm("Are you sure you want to save changes?")) {
			return;
		}

		if (modifiedNewPassword && modifiedConfirmPassword) {
			if (newPasswordField.value !== confirmPasswordField.value) {
				toast.error("Passwords do not match");
				newPasswordField.reset();
				confirmPasswordField.reset();
				setModifiedNewPassword(false);
				setModifiedConfirmPassword(false);
				return;
			}

			if (newPasswordField.value.length < 8) {
				toast.error("Password must be at least 8 characters long!");
				newPasswordField.reset();
				confirmPasswordField.reset();
				setModifiedNewPassword(false);
				setModifiedConfirmPassword(false);
				return;
			}

			updatedData.password = newPasswordField.value;
		}
		if (modifiedEmail) {
			if (emailField.value === "") {
				toast.error("Email cannot be empty");
				emailField.setValue(initialEmail);
				setModifiedEmail(false);
				return;
			}
			if (emailField.value === initialEmail) {
				toast.error("Email must be different from current email!");
				emailField.setValue(initialEmail);
				setModifiedEmail(false);
				return;
			}

			updatedData.email = emailField.value;
		}

		if (modifiedUsername) {
			if (usernameField.value === "") {
				toast.error("Username cannot be empty");
				usernameField.setValue(initialUsername);
				setModifiedUsername(false);
				return;
			}

			if (usernameField.value === initialUsername) {
				toast.error(
					"Username must be different from current username!"
				);
				usernameField.setValue(initialUsername);
				setModifiedUsername(false);
				return;
			}

			updatedData.username = usernameField.value;
		}
		if (Object.keys(updatedData).length > 1) {
			try {
				const response = await updateUser(updatedData);
				const data = response.data;

				setInitialUsername(data.username);
				setInitialEmail(data.email);
				newPasswordField.reset();
				confirmPasswordField.reset();
				toast.success("Changes saved successfully");
			} catch (error) {
				toast.error(error.response.data.message);
			}
		} else {
			resetForm();
			toast.info("No changes detected");
		}
	};

	const handleCancel = () => {
		if (
			window.confirm(
				"Are you sure you want to cancel? Any unsaved changes will be lost."
			)
		) {
			resetForm();
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

				if (response.statusText === "No Content") {
					Cookies.remove("jwt");
					setIsAuthenticated(false);
					navigate("/", {
						state: { message: "Account deleted successfully" },
					});
				}
			} catch (error) {
				console.error("Error deleting account:", error);
				toast.error("Failed to delete account");
			}
		}
	};

	return (
		<div className={`${styles.accountPage} account-page ${theme}`}>
			<h1>My Account</h1>
			<div className={styles.pictureSection}>
				<h2>Profile Picture</h2>
				<img
					src={profilePicture}
					alt='Profile'
					className={styles.profilePicture}
				/>
			</div>
			<div className={styles.infoSection}>
				<form onSubmit={handleSaveChanges}>
					<h2>Basic Information</h2>
					<label>Username:</label>
					<input
						type={usernameField.type}
						className={styles.text}
						value={usernameField.value.trim()}
						onChange={usernameField.onChange}
						onBlur={() => {
							if (
								usernameField.value !== "" &&
								usernameField.value !== initialUsername
							) {
								setModifiedUsername(true);
							} else {
								setModifiedUsername(false);
							}
						}}
					/>
					<label>Email:</label>
					<input
						type={emailField.type}
						className={styles.email}
						value={emailField.value.trim()}
						onChange={emailField.onChange}
						onBlur={() => {
							if (
								emailField.value !== "" &&
								emailField.value !== initialEmail
							) {
								setModifiedEmail(true);
							} else {
								setModifiedEmail(false);
							}
						}}
					/>
					<div className={styles.passwordSection}>
						<h2>Password Management</h2>
						<label>New Password:</label>
						<input
							type={newPasswordField.type}
							className={styles.password}
							value={newPasswordField.value.trim()}
							onChange={newPasswordField.onChange}
							onBlur={() => {
								if (newPasswordField.value !== "") {
									setModifiedNewPassword(true);
								} else {
									setModifiedNewPassword(false);
								}
							}}
						/>
						<label>Confirm Password:</label>
						<input
							type={confirmPasswordField.type}
							className={styles.password}
							value={confirmPasswordField.value.trim()}
							onChange={confirmPasswordField.onChange}
							onBlur={() => {
								if (confirmPasswordField.value !== "") {
									setModifiedConfirmPassword(true);
								} else {
									setModifiedConfirmPassword(false);
								}
							}}
						/>
					</div>
				</form>
			</div>
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
