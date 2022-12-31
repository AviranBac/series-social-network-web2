const express = require("express");
const HttpStatus = require("http-status-codes");
const { validationResult } = require('express-validator/check');
const followsValidation = require('../validation/follow');
const { addFollow, removeFollow } = require("../services/follows");
const router = express.Router();

router.post('', followsValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    const { action, emailFrom, emailTo } = req.body;

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