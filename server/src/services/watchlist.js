const WatchLists = require("../db/mongo/models/watchlist");

const searchWatchlistByUsername = async (username) => {
    return WatchLists.find({ username: username}).exec();
};

module.exports = {
    searchWatchlistByUsername
}