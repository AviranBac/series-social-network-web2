const express = require("express");
const WatchLists = require('../db/mongo/models/watchlist');

const router = express.Router();

router.get('/:username', async (req, res) => {
    const username  = req.params.username;
    try {
        let watchlist = await WatchLists.find({ username: username}).exec();
        res.send(watchlist);
        console.log(`Sending requested watchlist of ${username}`);
    } catch (e) {
        console.log(`Couldn't send watchlist of ${username}, error was ${e}`);
    }
});

module.exports = {
    watchlistRouter: router
};