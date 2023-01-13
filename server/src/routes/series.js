const express = require('express');
const HttpStatus = require("http-status-codes");
const Series = require('../db/mongo/models/series');
const Genres = require('../db/mongo/models/genre');
const { validationResult } = require('express-validator/check');
const seriesValidation = require('../validation/series');

const { filterSeries, getMostWatchedSeries, getCommonSeriesAmongFollowing, getTopRatedSeries, getPopularSeries, getSeriesDetails } = require('../services/series');
const { aggregateWatchlistEpisodes } = require('../services/watchlist');

const router = express.Router();

router.get('/', seriesValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    const { name, statuses, genres, pageNumber = 1 } = req.query;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await filterSeries({name, statuses, genres}, pageNumber);
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

    let response;
    let statusCode = HttpStatus.OK;
    const statuses = Series.schema.path('status').enumValues;
    try {
        const genres = await Genres.find();
        response = { genres, statuses };
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching genres: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/commonAmongFollowing/:email', seriesValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    const { pageNumber = 1 } = req.query;
    const { email } = req.params;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        const seriesWithWatchlistEpisodes = await aggregateWatchlistEpisodes(email);
        const seriesIdsWatchList = seriesWithWatchlistEpisodes.map(series => series._id);
        response = await getCommonSeriesAmongFollowing(email, seriesIdsWatchList, pageNumber);
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching common series amoung following: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/mostWatched', seriesValidation(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    const { pageNumber = 1} = req.query;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await getMostWatchedSeries(pageNumber);
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
    
    const { pageNumber = 1 } = req.query;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await getTopRatedSeries(pageNumber);
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
    
    const { pageNumber = 1 } = req.query;

    let response;
    let statusCode = HttpStatus.OK;
    try {
        response = await getPopularSeries(pageNumber);
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
        response = await getSeriesDetails(id);
        if (!response) { statusCode = HttpStatus.NOT_FOUND; }
    } catch (e) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while fetching series by id ${id}: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

module.exports = {
    seriesRouter: router
};
