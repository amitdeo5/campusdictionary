const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    role: String,
    verified: Boolean,
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
