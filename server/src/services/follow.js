const Follows = require("../db/mongo/models/follow");

const searchFollowers = async (email) => {
    return Follows.find({ email_from: email}).exec();
};

const searchFollowings = async (email) => {
    return Follows.find({ email_to: email }).exec();
};

const isFollowingExist = async (emailFrom, emailTo) => {
    return Follows.exists({ email_to: emailTo, email_from: emailFrom}).exec();
};


module.exports = {
    searchFollowers,
    searchFollowings,
    isFollowingExist
}