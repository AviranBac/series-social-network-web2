const express = require("express");
const WishLists = require('../db/mongo/models/wishlist');

const router = express.Router();

router.get('/:username', async (req, res) => {
    const username  = req.params.username;
    try {
        let wishlist = await WishLists.find({ username: username}).exec();
        res.send(wishlist);
        console.log(`Sending requested wishlist of ${username}`);
    } catch (e) {
        console.log(`Couldn't send wishlist of ${username}, error was ${e}`);
    }
});

module.exports = {
    wishlistRouter: router
};