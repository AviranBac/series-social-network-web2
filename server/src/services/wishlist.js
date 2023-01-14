const mongoose = require("mongoose");
const Series = require("../db/mongo/models/series");
const WishLists = require("../db/mongo/models/wishlist");

const getUserWishlist = async (email) => {
    const wishlist = await WishLists.findOne({ email }).exec();
    const seriesIds = wishlist?.series_ids || [];

    return Series.find({ _id: { $in: seriesIds } }).exec();
};

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
    getUserWishlist,
    addToWishlist,
    removeFromWishlist
};