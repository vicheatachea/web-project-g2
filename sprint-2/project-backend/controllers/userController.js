const User = require("../models/userModel");
const mongoose = require("mongoose");

const getUserData = async (req) => {
	try {
		const userData = await User.findOne({
			email: req.body.email,
			password: req.body.password,
		}).exec();
		return userData;
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
	}
};

const createUser = async (req, res) => {
	try {
		const newUser = await User.create({ ...req.body });
		res.status(201).json(newUser);
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

const updateUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        return res.status(400).json({ message: "Email or password are required!" });
    }

    const userData = await getUserData(req, res);

	if (!userData) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

    const userId = userData._id;

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		return res.status(400).json({ message: "Invalid ID" });
	}

	try {
		const updatedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{ ...req.body },
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
	const userData = await getUserData(req);
	const userId = userData._id;

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		return res.status(400).json({ message: "Invalid ID" });
	}

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
	createUser,
	updateUser,
	deleteUser,
};
