const mongoose = require('mongoose');

const followersSchema = new mongoose.Schema({
    usernameFrom: {
        type: String,
        require: true
    },
    usernameTo: {
        type: String,
        require: true
    }
});

const Followers = mongoose.model('follower', followersSchema);
module.exports = Followers;