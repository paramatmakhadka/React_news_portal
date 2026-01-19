const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Log these to see which one is undefined and causing the crash
console.log("Controller methods:", Object.keys(userController));
console.log("Middleware methods:", { protect, admin });

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Line 11: Ensure all three functions exist before this line runs
router.get("/", protect, admin, userController.getUsers);
router.get("/:id", protect, admin, userController.getUser);
router.put("/:id", protect, admin, userController.updateUser);
router.delete("/:id", protect, admin, userController.deleteUser);

module.exports = router;
