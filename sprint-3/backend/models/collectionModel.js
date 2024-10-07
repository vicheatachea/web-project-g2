const mongoose = require("mongoose");
const collectionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		id: {
			type: String,
			required: true,
			unique: true,
		},
		type: {
			type: String,
			required: true,
		},
		songAmount: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const collection = mongoose.model("Collection", collectionSchema);
module.exports = collection;