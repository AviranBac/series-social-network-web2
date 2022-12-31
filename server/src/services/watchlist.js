const WatchLists = require("../db/mongo/models/watchlist");

const getUserWatchlist = async (email) => {
    return WatchLists.find({email}).exec();
};

module.exports = {
    getUserWatchlist 
}