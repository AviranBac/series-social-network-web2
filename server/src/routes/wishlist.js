const express = require("express");
const HttpStatus = require("http-status-codes");
const {getUserWishlist} = require("../services/wishlist");

const router = express.Router();

router.get('/:email', async (req, res) => {

    let response;
    let statusCode = HttpStatus.OK;
    const email  = req.params.email;
    try {
        response = await getUserWishlist(email);
        console.log(`Sending requested wishlist of ${email}`);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Couldn't send wishlist of ${email}, error was ${e}`;
        console.log(response);
    }
    res.status(statusCode).send(response);
});

module.exports = {
    wishlistRouter: router
};