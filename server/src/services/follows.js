const Follows = require("../db/mongo/models/follow");

const validateInput = (action, emailFrom, emailTo) => {
    if (action !== "ADD" && action !== "REMOVE") {
        throw new Error(`action is invalid: ${action}`);
    }

    if (!emailFrom || emailFrom.trim() === "") {
        throw new Error(`emailFrom is invalid: ${emailFrom}`);
    }

    if (!emailTo || emailTo.trim() === "") {
        throw new Error(`emailTo is invalid: ${emailTo}`);
    }

    if (emailFrom === emailTo) {
        throw new Error(`Email ${emailFrom} cannot follow itself!`);
    }
};

const addFollow = async (emailFrom, emailTo) => {
    let follow = await Follows.findOne({ email_from: emailFrom, email_to: emailTo });

    if (!follow) {
        follow = await Follows.insertMany({ email_from: emailFrom, email_to: emailTo });
    }

    return follow;
};

const removeFollow = async (emailFrom, emailTo) => {
    return Follows.findOneAndRemove({ email_from: emailFrom, email_to: emailTo });
};

module.exports = {
    validateInput,
    addFollow,
    removeFollow
}