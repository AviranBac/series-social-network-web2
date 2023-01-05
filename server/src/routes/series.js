const express = require('express');
const mongoose = require("mongoose");
const HttpStatus = require("http-status-codes");
const Series = require('../db/mongo/models/series');
const Genres = require('../db/mongo/models/genre');

const { filterSeries, getMostWatchedSeries, aggregateSeries, getCommonSeriesAmongFollowing } = require('../services/series');
const { getUserWatchlist } = require('../services/watchlist');

const router = express.Router();

const pageLimit = 10;

router.get('/', async (req, res) => {
    const { pageNumber } = req.query;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await filterSeries(req.body, pageNumber, pageLimit);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching genres: ${e}`;
    }

    res.status(statusCode).send(response);
});

router.get('/filters', async (req, res) => {
    let genres;
    let statusCode = HttpStatus.OK;
    const statuses = Series.schema.path('status').enumValues;
    try {
        genres = await Genres.find();
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        genres = `Failed while fetching genres: ${e}`;
    }

    res.status(statusCode).send({ genres, statuses });
});

router.get('/commonAmongFollowing/:email', async (req, res) => {
    const { pageNumber } = req.query;
    const { email } = req.params;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        const userWatchList = await getUserWatchlist(email);
        response = await getCommonSeriesAmongFollowing(email, userWatchList.map(series => series.name), pageNumber, pageLimit);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching common series amoung following: ${e}`;
    }

    res.status(statusCode).send(response);
});

router.get('/watched', async (req, res) => {
    const { pageNumber } = req.query;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await getMostWatchedSeries(pageNumber, pageLimit);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching most watched series: ${e}`
        console.log(response);
    }

    res.status(statusCode).send(response);

});

router.get('/topRated', async (req, res) => {
    const { pageNumber } = req.query;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await Series.find().sort({ vote_average: -1 }).skip(pageLimit * (pageNumber - 1)).limit(pageLimit).exec();
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching series by rating: ${e}`
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/popular', async (req, res) => {
    const { pageNumber } = req.query;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await Series.find().sort({ popularity: -1 }).skip(pageLimit * (pageNumber - 1)).limit(pageLimit).exec();
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching series by popularity: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await aggregateSeries([new mongoose.mongo.ObjectId(id)]);
        if (!response) { statusCode = HttpStatus.NOT_FOUND; }
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching series by id ${id}: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

module.exports = router;