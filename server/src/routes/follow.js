const express = require("express");
const Follows = require('../db/mongo/models/follow');

const router = express.Router();

router.get('/:email_from/followers', async (req, res) => {
    const emailFrom  = req.params.email_from;
    try {
        let followers = await Follows.find({ email_from: emailFrom}).exec();
        res.send(followers);
        console.log(`Sending requested followers of ${emailFrom}`);
    } catch (e) {
        console.log(`Couldn't send followers of ${emailFrom}, error was ${e}`);
    }
});

router.get('/:email_from/following', async (req, res) => {
    const emailFrom  = req.params.email_from;
    try {
        let following = await Follows.find({ email_to: emailFrom }).exec();
        res.send(following);
        console.log(`Sending requested following of ${emailFrom}`);
    } catch (e) {
        console.log(`Couldn't send following of ${emailFrom}, error was ${e}`);
    }
});

router.get('/:email_from/following/:email_to', async (req, res) => {
    const emailFrom  = req.params.email_from;
    const emailTo  = req.params.email_to;
    try {
        let following = await Follows.find({ email_to: emailTo, email_from: emailFrom}).exec();
        res.send(following);
        console.log(`Sending requested following from ${emailFrom} to ${emailTo}`);
    } catch (e) {
        console.log(`Couldn't send following from ${emailFrom} to ${emailTo}, error was ${e}`);
    }
});

module.exports = {
    followersRouter: router
};