const express = require("express");
const router = express.Router();
const {
	createCategory,
	getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
} = require("../controllers/categoryController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Public route (anyone can see categories)
router.get("/", getCategories);

// Admin only routes
router.post("/", protect, admin, createCategory);
router.get("/:id", protect, admin, getCategory);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

module.exports = router;
