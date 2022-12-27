const axios = require('axios');
const { initSeasons } = require('./seasons');
const Series = require("../../db/models/series");

const fetchingSeries = async () => {
    let series = [];

    // TODO: proper pagination limit
    try {
        console.log("Requesting popular series from TMDB");
        const response = await axios.get(`${process.env.TMDB_API_URL}tv/popular`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
                page: 1,
                limit: 50
            },
            headers: { "Accept-Encoding": "gzip,deflate,compress" }
        });

        series = response.data.results;
        console.log(`Got ${series.length} series from TMDB`);
    } catch (e) {
        console.log(`Failed while fetching series: ${e}`);
    }

    return series;
}

const fetchingNumberOfSeasons = async (series) => {
    let numOfSeasons = 0;

    try {
        console.log(`Requesting numberOfSeason for series id: ${series.id}, name: ${series.name}`);
        const seriesResponse = await axios.get(`${process.env.TMDB_API_URL}tv/${series.id}?api_key=${process.env.TMDB_API_KEY}`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" }
        });

        numOfSeasons = seriesResponse.data.number_of_seasons;
        console.log(`Got numberOfSeason for series id: ${series.id}, name: ${series.name}`);
    } catch (e) {
        console.log(`Failed while fetching number of seasons of series: ${e}`);
    }
    return numOfSeasons;
}

const insertSeries = async (series) => {
    let response = [];

    try {
        response = await Series.insertMany(series);
        console.log(`Inserted ${series.length} series to DB`);
    } catch (e) {
        console.log(`Failed while inserting series to DB: ${e}`);
    }

    return response;
};

const initSeries = async () => {
    const fetchedSeries = await fetchingSeries();

    const series = await Promise.all(fetchedSeries.map(async (series) => {
        const numOfSeasons = await fetchingNumberOfSeasons(series);
        return { ...series, number_of_seasons: numOfSeasons };
    }));

    const response = await insertSeries(series);
    response.forEach(series => initSeasons(series));
};

module.exports = {
    initSeries
};