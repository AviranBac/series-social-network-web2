const mongoose = require("mongoose");
const { paginationQuery } = require("../utils/queries");
const Series = require("../db/mongo/models/series");
const WishLists = require("../db/mongo/models/wishlist");

const getUserWishlist = async (email, pageNumber) => {
    const wishlist = await WishLists.findOne({ email }).exec();
    const seriesIds = wishlist?.series_ids;

    let data = [];
    let totalAmount = 0;
    if (seriesIds) {
        const aggregationQuery = [  
            { $match: { _id: { $in: seriesIds } }} 
        ];

        data = await Series.aggregate([...aggregationQuery, ...paginationQuery(pageNumber)]);
        const seriesTotalAmount = await Series.aggregate([...aggregationQuery, { $count: "count" }]);
        totalAmount = seriesTotalAmount[0] ? seriesTotalAmount[0].count : 0;
    }
    
    return { data, totalAmount };
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