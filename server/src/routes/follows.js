const express = require("express");
const HttpStatus = require("http-status-codes");
const { addFollow, validateInput, removeFollow } = require("../services/follows");
const router = express.Router();

router.post('', async (req, res) => {
    const { action, emailFrom, emailTo } = req.body;

    try {
        validateInput(action, emailFrom, emailTo);
    } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send(`${e}`);
        return;
    }

    try {
        const follow = action === "ADD" ?
            await addFollow(emailFrom, emailTo) :
            await removeFollow(emailFrom, emailTo);
        res.send(follow);
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(`Failed while trying to add/remove follow. action: ${action}, emailFrom: ${emailFrom}, emailTo: ${emailTo}. Error: ${e}`);
    }
});

module.exports = {
    followRouter: router
};