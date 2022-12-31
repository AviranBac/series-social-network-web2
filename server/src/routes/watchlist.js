const express = require("express");
const HttpStatus = require("http-status-codes");
const {getUserWatchlist } = require("../services/watchlist");

const router = express.Router();

router.get('/:email', async (req, res) => {

    let response;
    let statusCode = HttpStatus.OK;
    const email  = req.params.email;
    try {
        response = await getUserWatchlist(email);
        console.log(`Sending requested watchlist of ${email}`);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Couldn't send watchlist of ${email}, error was ${e}`;
        console.log(response);
    }
    res.status(statusCode).send(response);
});

module.exports = {
    watchlistRouter: router
};