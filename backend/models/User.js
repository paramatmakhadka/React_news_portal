const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: "user" },
});

// Plain text comparison
userSchema.methods.matchPassword = function (enteredPassword) {
	return enteredPassword === this.password;
};

module.exports = mongoose.model("User", userSchema);
