const express = require("express");
const HttpStatus = require("http-status-codes");
const { validationResult } = require('express-validator/check');

const { addToWatchlist, removeFromWatchlist } = require("../services/watchlist");
const watchlistValidation = require('../validation/watchlist');

const router = express.Router();

router.post('', watchlistValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    const { action, email, entityType, entityId } = req.body;

    let response;
    let statusCode = HttpStatus.OK;

    try {
        response = action === "ADD" ?
            await addToWatchlist(email, entityType, entityId) :
            await removeFromWatchlist(email, entityType, entityId);
        console.log(`${action} ${entityType} id ${entityId} in ${email}'s watchlist`);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to add/remove from watchlist. action: ${action}, entityType: ${entityType}, email: ${email}, entityId: ${entityId}. Error: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

module.exports = {
    watchlistRouter: router
};