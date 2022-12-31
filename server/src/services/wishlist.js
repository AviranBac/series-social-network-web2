const WishLists = require("../db/mongo/models/wishlist");
const mongoose = require("mongoose");

const addToWishlist = async (email, seriesId) => {
    return WishLists.findOneAndUpdate(
        { email },
        { $addToSet: { series_ids: new mongoose.mongo.ObjectId(seriesId) } },
        { upsert: true, new: true }
    );
};

const removeFromWishlist = async (email, seriesId) => {
    let updatedWishlist = await WishLists.findOneAndUpdate(
        { email },
        { $pullAll: { series_ids: [new mongoose.mongo.ObjectId(seriesId)] } },
        { new: true }
    );

    if (updatedWishlist.series_ids.length === 0) {
        updatedWishlist = await WishLists.findByIdAndDelete(updatedWishlist._id);
    }

    return updatedWishlist;
};

module.exports = {
    addToWishlist,
    removeFromWishlist
};