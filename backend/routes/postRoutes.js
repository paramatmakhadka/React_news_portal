const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware"); // Add this
const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "uploads/"),
	filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Apply 'protect' to POST, PUT, and DELETE
router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/", protect, upload.single("image"), postController.createPost);
router.put("/:id", protect, upload.single("image"), postController.updatePost);
router.delete("/:id", protect, postController.deletePost);

module.exports = router;
