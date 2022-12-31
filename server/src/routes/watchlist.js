const express = require("express");
const HttpStatus = require("http-status-codes");
const {searchWatchlistByUsername} = require("../services/watchlist");

const router = express.Router();

router.get('/:username', async (req, res) => {

    let response;
    let statusCode = HttpStatus.OK;
    const username  = req.params.username;
    try {
        response = await searchWatchlistByUsername(username);
        console.log(`Sending requested watchlist of ${username}`);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Couldn't send watchlist of ${username}, error was ${e}`;
        console.log(response);
    }
    res.status(statusCode).send(response);
});

module.exports = {
    watchlistRouter: router
};