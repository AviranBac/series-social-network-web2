const Follows = require("../db/mongo/models/follow");

const searchFollowings = async (email) => {
    return Follows.find({ email_from: email}).exec();
};

const searchFollowers = async (email) => {
    return Follows.find({ email_to: email }).exec();
};

const isFollowingExist = async (emailFrom, emailTo) => {
    return Follows.exists({ email_to: emailTo, email_from: emailFrom}).exec();
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
    isFollowingExist,
    addFollow,
    removeFollow
}