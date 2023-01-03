const express = require('express');
const Series = require('../db/mongo/models/series');
const Genres = require('../db/mongo/models/genre');

const { filterSeries } = require('../services/series');

const router = express.Router();

const pageLimit = 10;

router.get('/', async (req, res) => {
    let response;
    let statusCode = 200;

    try { 
        response = await filterSeries(req.body, req.query.pageNumber, pageLimit);
    } catch (e) {
        statusCode = 500;
        response = `Failed while fetching genres: ${e}`;
    }

    res.status(statusCode).send(response);
});

router.get('/filters', async (req, res) => {
    let response;
    let statusCode = 200;

    try { 
        response = await Genres.find();
    } catch (e) {
        statusCode = 500;
        response = `Failed while fetching genres: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/commonAmongFollowing/:username', async (req, res) => {
    const pageNumber = req.query.pageNumber;
    const username = req.params.username;
});

router.get('/watched', async (req, res) => {
});

router.get('/topRated', async (req, res) => {
    const pageNumber = req.query.pageNumber;

    let response;
    let statusCode = 200;
    try {
       response = await Series.find().sort({vote_average: -1}).skip(pageLimit * (pageNumber - 1)).limit(pageLimit).exec();
    } catch (e) {
        statusCode = 500;
        response = `Failed while fetching series by rating: ${e}`
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.get('/popular', async (req, res) => {
    const pageNumber = req.query.pageNumber;

    let response;
    let statusCode = 200;
    try {
       response = await Series.find().sort({popularity: -1}).skip(pageLimit * (pageNumber - 1)).limit(pageLimit).exec();
    } catch (e) {
        statusCode = 500;
        response = `Failed while fetching series by popularity: ${e}`;
        console.log(response);
    }
    
    res.status(statusCode).send(response);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    let response;
    let statusCode = 200;
    try {
        response = await Series.findById(id);
        if (!response) { statusCode = 404; }
    } catch (e) {
        statusCode = 500;
        response = `Failed while fetching series by id ${id}: ${e}`;
        console.log(response);
    }
    
    res.status(statusCode).send(response);
});

module.exports = router;