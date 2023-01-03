const mongoose = require('mongoose');
const Series = require('./series');

const wishlistsSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    series_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Series.modelName,
        require: true
    }]
});

const WishLists = mongoose.model('wishlist', wishlistsSchema);
module.exports = WishLists;