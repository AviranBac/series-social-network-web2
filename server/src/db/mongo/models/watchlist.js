const mongoose = require('mongoose');
const Episodes = require('./episode');

const watchlistsSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    episode_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Episodes.modelName,
        require: true
    }
});

const WatchLists = mongoose.model('watchlist', watchlistsSchema);
module.exports = WatchLists;