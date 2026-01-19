const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		image: { type: String },
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		}, // admin who posted
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Post", PostSchema);
