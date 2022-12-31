const WishLists = require("../db/mongo/models/wishlist");
const Series = require("../db/mongo/models/series");

const getUserWishlist = async (email) => {

    const wishlist = await WishLists.findOne({ email: email}).exec();

    // let seriesWishlist = [];
    // { $in: arrayOfIds }
    // // for (const series_id of wishlist.series_ids ) {
    // //     const seriesDetails = await Series.findById(series_id).exec();
    // //     seriesWishlist.push(seriesDetails);
    // // }
    const seriesWishlist = await Series.find({_id: { $in: wishlist.series_ids}}).exec();
    return seriesWishlist;
};

module.exports = {
    getUserWishlist
}