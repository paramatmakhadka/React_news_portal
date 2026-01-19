const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) return res.status(401).json({ message: "No token provided" });

	try {
		// Hardcoded secret key
		const decoded = jwt.verify(token, "my_super_secret_123");
		req.user = await User.findById(decoded.id);
		next();
	} catch (err) {
		res.status(401).json({ message: "Invalid token" });
	}
};

exports.admin = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		res.status(403).json({ message: "Admin access only" });
	}
};
