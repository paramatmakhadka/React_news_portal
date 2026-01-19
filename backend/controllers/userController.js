const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Use a hardcoded secret since we aren't using .env
const JWT_SECRET = "my_super_secret_123";

const generateToken = (id) => {
	return jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
};

// 1. Register
exports.registerUser = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		const userExists = await User.findOne({ email });
		if (userExists)
			return res.status(400).json({ message: "User already exists" });

		const user = await User.create({ name, email, password, role });
		res
			.status(201)
			.json({ _id: user._id, name: user.name, token: generateToken(user._id) });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// 2. Login
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		// Plain text comparison
		if (user && user.password === password) {
			res.json({
				_id: user._id,
				name: user.name,
				role: user.role,
				token: generateToken(user._id),
			});
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// 3. Get All Users (THE MISSING PIECE)
exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// 4. Get Single User
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({ message: "User not found" });
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// 5. Update User
exports.updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(user);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// 6. Delete User
exports.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ message: "User deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
