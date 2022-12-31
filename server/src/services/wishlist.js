const WishLists = require("../db/mongo/models/wishlist");
const Series = require("../db/mongo/models/series");

const searchWishlistByUsername = async (username) => {

    const wishlist = await WishLists.findOne({ username: username}).exec();

    let seriesWishlist = [];

    for (const series_id of wishlist.series_ids ) {
        const seriesDetails = await Series.findById(series_id).exec();
        seriesWishlist.push(seriesDetails);
    }
    
    return seriesWishlist;
};

module.exports = {
    searchWishlistByUsername
}