const express = require("express");
const HttpStatus = require("http-status-codes");
const { addFollow, removeFollow, validateFollowInput } = require("../services/follows");
const router = express.Router();

router.post('', async (req, res) => {
    const { action, emailFrom, emailTo } = req.body;

    try {
        validateFollowInput(action, emailFrom, emailTo);
    } catch (e) {
        res.status(HttpStatus.BAD_REQUEST).send(`${e}`);
        return;
    }

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = action === "ADD" ?
            await addFollow(emailFrom, emailTo) :
            await removeFollow(emailFrom, emailTo);
        console.log(`${action} follow from ${emailFrom} to ${emailTo}`);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to add/remove follow. action: ${action}, emailFrom: ${emailFrom}, emailTo: ${emailTo}. Error: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

module.exports = {
    followRouter: router
};