const express = require('express');
const mongoose = require("mongoose");
const Series = require('../db/mongo/models/series');
const Genres = require('../db/mongo/models/genre');

const { searchFollowers } = require("../services/follows");
const { filterSeries, getMostWatchedSeries, aggregateSeries } = require('../services/series');

const router = express.Router();

const pageLimit = 10;

router.get('/', async (req, res) => {
    const { pageNumber } = req.query;

    let response;
    let statusCode = 200;
    try {
        response = await filterSeries(req.body, pageNumber, pageLimit);
    } catch (e) {
        statusCode = 500;
        response = `Failed while fetching genres: ${e}`;
    }

    res.status(statusCode).send(response);
});

router.get('/filters', async (req, res) => {
    let genres;
    let statusCode = 200;
    const statuses = Series.schema.path('status').enumValues;
    try {
        genres = await Genres.find();
    } catch (e) {
        statusCode = 500;
        genres = `Failed while fetching genres: ${e}`;
    }

    res.status(statusCode).send({ genres, statuses });
});

router.get('/commonAmongFollowing/:email', async (req, res) => {
    const { pageNumber } = req.query;
    const { email } = req.params;

    let followings;
    let statusCode = HttpStatus.OK;

    try {
        followings = await searchFollowers(email);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        followings = `Couldn't send following of ${email}, error was ${e}`;
        console.log(followings);
    }
});

router.get('/watched', async (req, res) => {
    const { pageNumber } = req.query;

    let response;
    let statusCode = 200;
    try {
        response = await getMostWatchedSeries(pageNumber, pageLimit);
    } catch (e) {
        statusCode = 500;
        response = `Failed while fetching watched series: ${e}`
        console.log(response);
    }

    res.status(statusCode).send(response);

});

router.get('/topRated', async (req, res) => {
    const { pageNumber } = req.query;

    let response;
    let statusCode = 200;
    try {
        response = await Series.find().sort({ vote_average: -1 }).skip(pageLimit * (pageNumber - 1)).limit(pageLimit).exec();
    } catch (e) {
        statusCode = 500;
        response = `Failed while fetching series by rating: ${e}`
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/popular', async (req, res) => {
    const { pageNumber } = req.query;

    let response;
    let statusCode = 200;
    try {
        response = await Series.find().sort({ popularity: -1 }).skip(pageLimit * (pageNumber - 1)).limit(pageLimit).exec();
    } catch (e) {
        statusCode = 500;
        response = `Failed while fetching series by popularity: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    let response;
    let statusCode = 200;
    try {
        response = await aggregateSeries([new mongoose.mongo.ObjectId(id)]);
        if (!response) { statusCode = 404; }
    } catch (e) {
        statusCode = 500;
        response = `Failed while fetching series by id ${id}: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

module.exports = router;