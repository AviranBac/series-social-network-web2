const express = require("express");
const HttpStatus = require("http-status-codes");
const { validateWishlistInput, addToWishlist, removeFromWishlist } = require("../services/wishlist");
const router = express.Router();

router.post('', async (req, res) => {
    const { action, email, seriesId } = req.body;

    let response;
    let statusCode = HttpStatus.OK;
    validateWishlistInput(action, email, seriesId)
        .then(async () => {
            try {
                response = action === "ADD" ?
                    await addToWishlist(email, seriesId) :
                    await removeFromWishlist(email, seriesId);
                console.log(`${action} series id ${seriesId} in ${email}'s wishlist`);
            } catch (e) {
                statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                response = `Failed while trying to add/remove from wishlist. action: ${action}, email: ${email}, seriesId: ${seriesId}. Error: ${e}`;
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
    wishlistRouter: router
};