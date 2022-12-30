const Series = require("../db/mongo/models/series");
const WishLists = require("../db/mongo/models/wishlist");
const mongoose = require("mongoose");

const validateWishlistInput = async (action, email, seriesId) => {
    if (action !== "ADD" && action !== "REMOVE") {
        throw new Error(`action is invalid: ${action}`);
    }

    if (!email || email.trim() === "") {
        throw new Error(`email is invalid: ${email}`);
    }

    let entityExistsError;
    try {
        const entityExists = !!(await Series.findById(seriesId));

        if (!entityExists) {
            entityExistsError = `seriesId ${seriesId} does not exist`;
        }
    } catch (e) {
        entityExistsError = `Failed to find series id ${seriesId}. Error: ${e}`;
    }

    if (entityExistsError) {
        throw new Error(entityExistsError);
    }
};

const addToWishlist = async (email, seriesId) => {
    return WishLists.findOneAndUpdate(
        { email },
        {
            $addToSet: {
                series_ids: new mongoose.mongo.ObjectId(seriesId)
            }
        },
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
    validateWishlistInput,
    addToWishlist,
    removeFromWishlist
};