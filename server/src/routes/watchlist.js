const express = require("express");
const HttpStatus = require("http-status-codes");
const { validateWatchlistInput, addToWatchlist, removeFromWatchlist } = require("../services/watchlist");
const router = express.Router();

router.post('', async (req, res) => {
    const { action, email, entityType, entityId } = req.body;

    let response;
    let statusCode = HttpStatus.OK;
    validateWatchlistInput(action, email, entityType, entityId)
        .then(async () => {
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
        })
        .catch(validationError => {
            statusCode = HttpStatus.BAD_REQUEST;
            response = `${validationError}`;
            console.log(response);
        })
        .finally(() => {
            res.status(statusCode).send(response);
        });
});

module.exports = {
    watchlistRouter: router
};