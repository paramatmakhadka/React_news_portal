const Category = require("../models/Category");

// @desc    Create new category
// @route   POST /api/categories
exports.createCategory = async (req, res) => {
	try {
		const { name } = req.body;

		// Check if category name is provided
		if (!name)
			return res.status(400).json({ message: "Category name is required" });

		// Check for duplicates
		const exists = await Category.findOne({ name });
		if (exists)
			return res.status(400).json({ message: "Category already exists" });

		const category = await Category.create({ name });
		res.status(201).json(category);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// @desc    Get all categories
// @route   GET /api/categories
exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find().sort({ createdAt: -1 });
		res.json(categories);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// @desc    Get single category
// @route   GET /api/categories/:id
exports.getCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);
		if (!category)
			return res.status(404).json({ message: "Category not found" });
		res.json(category);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// @desc    Update category
// @route   PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			{ name: req.body.name },
			{ new: true, runValidators: true },
		);

		if (!category)
			return res.status(404).json({ message: "Category not found" });
		res.json(category);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndDelete(req.params.id);
		if (!category)
			return res.status(404).json({ message: "Category not found" });
		res.json({ message: "Category deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
