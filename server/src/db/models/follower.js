const mongoose = require('mongoose');

const followersSchema = new mongoose.Schema({
    username_from: {
        type: String,
        require: true
    },
    username_to: {
        type: String,
        require: true
    }
});

const Followers = mongoose.model('follower', followersSchema);
module.exports = Followers;