const Follows = require("../db/mongo/models/follow");
const { paginationQuery } = require("../utils/queries");

const searchFollowings = async (email, pageNumber) => {
    const aggregationQuery = [
        { $match: { email_from: email } }
    ];
    const data = await Follows.aggregate([...aggregationQuery, ...paginationQuery(pageNumber)]);
    const dataTotalAmount = await Follows.aggregate([...aggregationQuery, { $count: "count" }]);
    const totalAmount = dataTotalAmount[0] ? dataTotalAmount[0].count : 0;

    return { data, totalAmount };
};

const searchFollowers = async (email, pageNumber) => {
    const aggregationQuery = [
        { $match: { email_to: email } }
    ];
    const data = await Follows.aggregate([...aggregationQuery, ...paginationQuery(pageNumber)]);
    const dataTotalAmount = await Follows.aggregate([...aggregationQuery, { $count: "count" }]);
    const totalAmount = dataTotalAmount[0] ? dataTotalAmount[0].count : 0;

    return { data, totalAmount };
};

const getMostFollowedUsers = async (pageNumber) => {
    const aggregationQuery = [
        { $group: { _id: "$email_to", count: { $sum: 1 } } },
        { $project: { _id: 0, "email": "$_id", "followersCount": "$count" } },
        { $sort: { "followersCount": -1, "email": 1 } }
    ];
    const data = await Follows.aggregate([...aggregationQuery, ...paginationQuery(pageNumber)]);
    const dataTotalAmount = await Follows.aggregate([...aggregationQuery, { $count: "count" }]);
    const totalAmount = dataTotalAmount[0] ? dataTotalAmount[0].count : 0;

    return { data, totalAmount };
};

const getFollowings = async (email) => {
    return Follows.find({ email_from: email }).exec();
};

const isFollowingExist = async (emailFrom, emailTo) => {
    return Follows.exists({ email_to: emailTo, email_from: emailFrom }).exec();
};

const addFollow = async (emailFrom, emailTo) => {
    return Follows.findOneAndUpdate(
        { email_from: emailFrom, email_to: emailTo },
        { email_from: emailFrom, email_to: emailTo },
        { upsert: true, new: true }
    );
};

const removeFollow = async (emailFrom, emailTo) => {
    return Follows.findOneAndRemove({ email_from: emailFrom, email_to: emailTo });
};

module.exports = {
    searchFollowers,
    searchFollowings,
    getMostFollowedUsers,
    getFollowings,
    isFollowingExist,
    addFollow,
    removeFollow
}