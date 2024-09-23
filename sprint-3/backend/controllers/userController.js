const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

const jwt_secret_key = process.env.JWT_SECRET;

const getUserData = async (req) => {
	try {
		const userId = req.user ? req.user.userId : null;
		const { email } = req.body;
		//console.log(email, userId);

		if (!userId) {
			const userData = await User.findOne({
				email: email,
			}).exec();
			if (!userData) {
				return null;
			} else {
				return userData;
			}
		} else {
			const userData = await User.findOne({
				_id: userId,
			}).exec();
			if (userData) {
				return userData;
			} else {
				return null;
			}
		}
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
	}
};

const registerUser = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const newUser = await User.signup(username, email, password);
		loginUser(req, res, next, newUser, password);
	} catch (error) {
		if (error instanceof mongoose.Error.ValidationError) {
			res.status(400).json({
				message: "Invalid input",
				error: error.message,
			});
		} else {
			res.status(500).json({
				message: "Failed to create user",
				error: error.message,
			});
		}
	}
};

const loginUser = async (
	req,
	res,
	next /* idk why but it doesn't work without */,
	user = null,
	unHashedPassword = null
) => {
	try {
		//console.log('user:', user);
		//console.log('req.body:', req.body);

		const { email, password } = user ? user : req.body;

		if (!email || (!password && !unHashedPassword)) {
			return res
				.status(400)
				.json({ message: "Email and password are required!" });
		}
		const userData = user ? user : await getUserData(req, res);

		//console.log(userData);
		if (!userData) {
			return res.status(404).json({ message: "User not found" });
		}

		const passwordMatch = await bcrypt.compare(
			unHashedPassword ? unHashedPassword : password,
			userData.password
		);
		//console.log(passwordMatch);
		const usernameMatch = email === userData.email;

		if (!passwordMatch || !usernameMatch) {
			return res
				.status(401)
				.json({ message: "Invalid password or email!" });
		}

		const token = jwt.sign({ userId: userData._id }, jwt_secret_key, {
			expiresIn: "1h",
		});
		res.cookie("jwt", token, { httpOnly: true, secure: true });

		console.log("Login Successful", token);
		res.status(200).json({ message: "Login successful", token: token });
	} catch (error) {
		res.status(500).json({ Error: error.message });
	}
};

const updateUser = async (req, res) => {
	const { username, email, password, role } = req.body;

	if (!username && !email && !password && !role) {
		return res.status(400).json({ message: "No data to update" });
	}

	const userData = await getUserData(req, res);

	if (!userData) {
		return res.status(404).json({ message: "User not found" });
	}

	const userId = userData._id;

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		return res.status(400).json({ message: "Invalid ID" });
	}

	try {
		let updatedData = { username, email, password, role };
		if (password) {
			updatedData.password = await bcrypt.hash(password, 10);
		}

		const updatedUser = await User.findOneAndUpdate(
			{ _id: userId },
			updatedData,
			{ new: true }
		);
		if (updatedUser) {
			res.status(200).json(updatedUser);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		if (error instanceof mongoose.Error.ValidationError) {
			res.status(400).json({
				message: "Invalid input",
				error: error.message,
			});
		} else {
			res.status(500).json({
				message: "Failed to update user",
				error: error.message,
			});
		}
	}
};

const deleteUser = async (req, res) => {
	const userData = await getUserData(req, res);
	//console.log(userData);

	if (userData === null) {
		return res.status(404).json({ message: "User not found" });
	}

	const userId = userData._id;

	try {
		const isDeleted = await User.findOneAndDelete({ _id: userId });
		if (isDeleted) {
			res.status(204).json({ message: "User deleted" });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		if (error instanceof mongoose.Error.ValidationError) {
			res.status(400).json({
				message: "Invalid input",
				error: error.message,
			});
		} else {
			res.status(500).json({
				message: "Failed to delete user",
				error: error.message,
			});
		}
	}
};

module.exports = {
	registerUser,
	loginUser,
	updateUser,
	deleteUser,
};
