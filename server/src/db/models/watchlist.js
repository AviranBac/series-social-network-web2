const mongoose = require('mongoose');
const Episodes = require('./episode');

const watchlistsSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    episodeId: {
        type: Episodes.schema,
        require: true
    }
});

const WatchLists = mongoose.model('watchlist', watchlistsSchema);
module.exports = WatchLists;