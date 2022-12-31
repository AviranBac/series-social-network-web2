const express = require("express");
const { searchFollowers, searchFollowings, isFollowingExist} = require("../services/follow");
const HttpStatus = require("http-status-codes");
const { validationResult } = require('express-validator/check');
const router = express.Router();

router.get('/:email/followers', async (req, res) => {
    validateRequest(req);

    let response;
    let statusCode = HttpStatus.OK;
    const emailFrom  = req.params.email;
    try {
        response = await searchFollowers(emailFrom);
        console.log(`Sending requested followers of ${emailFrom}`);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Couldn't send followers of ${emailFrom}, error was ${e}`;
        console.log(response);
    }
    res.status(statusCode).send(response);
});

router.get('/:email_from/following', async (req, res) => {
    validateRequest(req);

    let response;
    let statusCode = HttpStatus.OK;
    const emailFrom  = req.params.email_from;
    try {
        response = await searchFollowings(emailFrom);
        console.log(`Sending requested following of ${emailFrom}`);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Couldn't send following of ${emailFrom}, error was ${e}`;
        console.log(response);
    }
    res.status(statusCode).send(response);
});

router.get('/:email_from/following/:email_to', async (req, res) => {
    validateRequest(req);

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

const validateRequest = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    } 
};

module.exports = {
    followersRouter: router
};