const Follows = require("../db/mongo/models/follow");

const searchFollowers = async (emailFrom) => {
    return Follows.find({ email_from: emailFrom}).exec();
};

const searchFollowings = async (emailFrom) => {
    return Follows.find({ email_to: emailFrom }).exec();
};

const isFollowingExist = async (emailFrom, emailTo) => {
    return Follows.exists({ email_to: emailTo, email_from: emailFrom}).exec();
};


module.exports = {
    searchFollowers,
    searchFollowings,
    isFollowingExist
}