const express = require("express");
const HttpStatus = require("http-status-codes");
const { validationResult } = require('express-validator/check');

const { validateWishlistInput, addToWishlist, removeFromWishlist } = require("../services/wishlist");
const wishlistValidation = require('../validation/wishlist');

const router = express.Router();

router.post('', wishlistValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    const { action, email, seriesId } = req.body;

    let response;
    let statusCode = HttpStatus.OK;
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

    res.status(statusCode).send(response);
});

module.exports = {
    wishlistRouter: router
};