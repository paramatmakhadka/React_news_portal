const Post = require("../models/Post");
const fs = require("fs");
const path = require("path");

// --- CREATE POST ---
exports.createPost = async (req, res) => {
	try {
		const { title, content, category } = req.body;

		if (!title || !content || !category) {
			return res
				.status(400)
				.json({ message: "Title, content, and category are required" });
		}

		const post = await Post.create({
			title,
			content,
			category,
			author: req.user._id, // link to admin
			image: req.file ? req.file.path : null,
		});

		res.status(201).json(post);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// --- GET ALL POSTS (Handles both "All" and "Category Filtering") ---
exports.getPosts = async (req, res) => {
	try {
		let filter = {};

		// If the URL has ?category=ID, this adds it to the database query
		if (req.query.category) {
			filter.category = req.query.category;
		}

		const posts = await Post.find(filter)
			.populate("category", "name")
			.populate("author", "name")
			.sort({ createdAt: -1 }); // Newest first

		res.json(posts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// --- GET SINGLE POST BY ID (For the details page) ---
exports.getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
			.populate("category", "name")
			.populate("author", "name");

		if (!post) return res.status(404).json({ message: "Post not found" });
		res.json(post);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// --- UPDATE POST ---
exports.updatePost = async (req, res) => {
	try {
		const { title, content, category } = req.body;

		if (!title || !content || !category) {
			return res
				.status(400)
				.json({ message: "Title, content, and category are required" });
		}

		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json({ message: "Post not found" });

		// Delete old image if a new one is uploaded
		if (req.file && post.image) {
			const oldImagePath = path.join(__dirname, "../", post.image);
			fs.unlink(oldImagePath, (err) => {
				if (err) console.log("Failed to delete old image:", err);
			});
		}

		post.title = title;
		post.content = content;
		post.category = category;
		if (req.file) post.image = req.file.path;

		await post.save();
		res.json(post);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// --- DELETE POST ---
exports.deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json({ message: "Post not found" });

		// Remove image from local storage
		if (post.image) {
			const imagePath = path.join(__dirname, "../", post.image);
			fs.unlink(imagePath, (err) => {
				if (err) console.log("Failed to delete image:", err);
			});
		}

		await Post.findByIdAndDelete(req.params.id);
		res.json({ message: "Post deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
