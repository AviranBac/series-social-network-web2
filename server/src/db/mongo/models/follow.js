const mongoose = require('mongoose');

const followsSchema = new mongoose.Schema({
    email_from: {
        type: String,
        require: true
    },
    email_to: {
        type: String,
        require: true
    }
});

const Follows = mongoose.model('follow', followsSchema);
module.exports = Follows;