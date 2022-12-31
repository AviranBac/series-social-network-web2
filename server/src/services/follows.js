const Follows = require("../db/mongo/models/follow");

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
    addFollow,
    removeFollow
}