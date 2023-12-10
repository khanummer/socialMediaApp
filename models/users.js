const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    bio: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;