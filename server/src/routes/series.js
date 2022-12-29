const express = require('express');
const Series = require('../db/mongo/models/series');
const router = express.Router();

const pageLimit = 10;

router.get('/', async (req, res) => {
    res.send('working');
});

router.get('/filters');

router.get('/commonAmongFollowing');

router.get('/watched');

router.get('/topRated', async (req, res) => {
    const pageNumber = 1 || req.params.pageNumber;

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
    const pageNumber = req.params.pageNumber;

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