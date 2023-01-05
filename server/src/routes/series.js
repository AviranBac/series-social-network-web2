const express = require('express');
const mongoose = require("mongoose");
const HttpStatus = require("http-status-codes");
const Series = require('../db/mongo/models/series');
const Genres = require('../db/mongo/models/genre');
const { validationResult } = require('express-validator/check');
const seriesValidation = require('../validation/series');

const { filterSeries, getMostWatchedSeries, aggregateSeries, getCommonSeriesAmongFollowing, getTopRatedSeries, getPopularSeries } = require('../services/series');
const { getUserSeriesIdsFromWatchlist } = require('../services/watchlist');

const router = express.Router();

const pageLimit = 10;

router.get('/', seriesValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    const { pageNumber } = req.query;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await filterSeries(req.body, pageNumber, pageLimit);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching genres: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/filters', seriesValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

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

router.get('/commonAmongFollowing/:email', seriesValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    const { pageNumber } = req.query;
    const { email } = req.params;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        const userSeriesIdsWatchList = await getUserSeriesIdsFromWatchlist(email);
        response = await getCommonSeriesAmongFollowing(email, userSeriesIdsWatchList, pageNumber, pageLimit);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching common series amoung following: ${e}`;
    }

    res.status(statusCode).send(response);
});

router.get('/watched', seriesValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

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

router.get('/topRated', seriesValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }
    
    const { pageNumber } = req.query;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await getTopRatedSeries(pageNumber, pageLimit);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching series by rating: ${e}`
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/popular', seriesValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }
    
    const { pageNumber } = req.query;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await getPopularSeries(pageNumber, pageLimit);
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