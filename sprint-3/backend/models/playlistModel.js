const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		songs: [
			{
				songId: {
					type: String,
					required: true,
					unique: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const playlist = mongoose.model("Collection", playlistSchema);

module.exports = playlist;
