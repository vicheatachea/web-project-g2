const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Playlist = require("./playlistModel");
const ValidationError = require("./errors");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
		playlists: {
			type: [Playlist.schema],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const validateUser = async function (username, email, password) {
	if (username && username.length == 0) {
		throw new ValidationError("Username cannot be empty");
	}

	if (email && email.length == 0) {
		throw new ValidationError("Email cannot be empty");
	}

	if (email && !validator.isEmail(email)) {
		throw new ValidationError("Email is invalid");
	}

	if (password && !validator.isLength(password, { min: 8 })) {
		throw new ValidationError(
			"Password must be at least 8 characters long!"
		);
	}
};

userSchema.statics.signup = async function (username, email, password) {
	if (!username || !email || !password) {
		throw new ValidationError("All fields are required!");
	}

	await validateUser(username, email, password);

	const existingUser = await this.findOne({ email });

	if (existingUser) {
		throw new ValidationError("Email is already in use");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await this.create({
		username,
		email,
		password: hashedPassword,
	});

	return user;
};

userSchema.statics.update = async function (userId, updatedData) {
	if (!userId || !updatedData) {
		throw new ValidationError("Missing required fields");
	}

	await validateUser(
		updatedData.username,
		updatedData.email,
		updatedData.password
	);

	const updatedUser = await this.findOneAndUpdate(
		{ _id: userId },
		updatedData,
		{ new: true }
	);

	return updatedUser;
};

const User = mongoose.model("User", userSchema);

module.exports = User;