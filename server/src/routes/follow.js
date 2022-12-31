const express = require("express");
const { searchFollowers, searchFollowings, isFollowingExist} = require("../services/follow");
const HttpStatus = require("http-status-codes");
const router = express.Router();

router.get('/:email/followers', async (req, res) => {

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

router.get('/:email/following', async (req, res) => {

    let response;
    let statusCode = HttpStatus.OK;
    const email  = req.params.email;
    try {
        response = await searchFollowings(email);
        console.log(`Sending requested following of ${email}`);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Couldn't send following of ${email}, error was ${e}`;
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


module.exports = {
    followersRouter: router
};