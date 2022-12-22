const mongoose = require('mongoose');
const Series = require('./series');

const wishlistsSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    seriesIds: {
        type: [Series.schema],
        require: true
    }
});

const wishLists = mongoose.model('wishlist', wishlistsSchema);
module.exports = wishLists;