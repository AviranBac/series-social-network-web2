const express = require("express");
const { getSeriesDetails } = require("../services/series");
const HttpStatus = require("http-status-codes");
const router = express.Router();

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
