const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    twitterId: String,
    token: String,
    displayName: String,
    username: String
});

const User = module.exports = mongoose.model('User', UserSchema);