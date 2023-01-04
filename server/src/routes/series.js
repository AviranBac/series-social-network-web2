const express = require("express");
const { getSeriesDetails } = require("../services/series");
const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    let response;
    let statusCode = 200;
    try {
        response = await getSeriesDetails(id);
        if (!response) { statusCode = 404; }
    } catch (e) {
        statusCode = 500;
        response = `Failed while fetching series by id ${id}: ${e}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

module.exports = {
    seriesRouter: router
};
