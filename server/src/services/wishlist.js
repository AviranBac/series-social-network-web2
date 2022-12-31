const WishLists = require("../db/mongo/models/wishlist");
const Series = require("../db/mongo/models/series");

const getUserWishlist = async (email) => {

    const wishlist = await WishLists.findOne({ email: email}).exec();
    return Series.find({_id: { $in: wishlist.series_ids}}).exec();
};

module.exports = {
    getUserWishlist
}