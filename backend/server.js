const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// 1. Import Routes
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Hardcoded Configurations
const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/himalayan_times";

// Database Connection
mongoose
	.connect(MONGO_URI)
	.then(() => console.log("✅ MongoDB Connected Successfully"))
	.catch((err) => console.log("❌ Database Connection Error: ", err));

// 2. Route Registration
// This defines the "Prefix" for your URLs
app.use("/api/users", userRoutes); // e.g., http://localhost:5000/api/users/login
app.use("/api/categories", categoryRoutes); // e.g., http://localhost:5000/api/categories
app.use("/api/posts", postRoutes); // e.g., http://localhost:5000/api/posts

// Global Error Handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		message: "Internal Server Error",
		error: err.message,
	});
});

// This allows you to visit http://localhost:5000/uploads/filename.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
