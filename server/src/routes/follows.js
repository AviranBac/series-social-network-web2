const express = require("express");
const HttpStatus = require("http-status-codes");
const { validationResult } = require('express-validator/check');
const followsValidation = require('../validation/follow');
const { addFollow, removeFollow, searchFollowings, searchFollowers, isFollowingExist } = require("../services/follows");

const router = express.Router();
const pageLimit = 10;

router.get('/:email/following', async (req, res) => {
    let response;
    let statusCode = HttpStatus.OK;
    const { email }  = req.params;
    const { pageNumber = 1 } = req.query;

    try {
        response = await searchFollowings(email, pageNumber, pageLimit);
        console.log(`Sending requested followings of ${email}`);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Couldn't send followings of ${email}, error was ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/:email/followers', async (req, res) => {
    let response;
    let statusCode = HttpStatus.OK;
    const { email }  = req.params;
    const { pageNumber = 1 } = req.query;

    try {
        response = await searchFollowers(email, pageNumber, pageLimit);
        console.log(`Sending requested followers of ${email}`);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Couldn't send followers of ${email}, error was ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/:email_from/following/:email_to', async (req, res) => {
    let response;
    let statusCode = HttpStatus.OK;
    const emailFrom  = req.params.email_from;
    const emailTo  = req.params.email_to;

    try {
        response = await isFollowingExist(emailFrom, emailTo)
        console.log(`Sending requested following from ${emailFrom} to ${emailTo}`);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Couldn't send following from ${emailFrom} to ${emailTo}, error was ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

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