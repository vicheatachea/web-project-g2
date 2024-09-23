const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
	},
	{
		timestamps: true,
	}
);

userSchema.statics.signup = async function (username, email, password) {
	if (!username || !email || !password) {
		throw new Error("All fields are required!");
	}

	if (!validator.isEmail(email)) {
		throw new Error("Email is invalid");
	}

	if (!validator.isLength(password, { min: 8 })) {
		throw new Error("Password must be at least 8 characters long!");
	}

	const existingUser = await User.findOne({ email });

	if (existingUser) {
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await this.create({
		username,
		email,
		password: hashedPassword,
	});

	return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
