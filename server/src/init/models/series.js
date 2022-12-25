const axios = require('axios');
const Serieses = require('../../db/models/series');
const { initSeasonsList } = require('./seasons');

const fetchingSeries = async () => {
    let serieses = [];
    try {
        const response = await axios.get(process.env.TMDB_API_URL + 'tv/popular', {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
                page: 1,
                limit: 50
            },
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        });
        serieses = response.data.results;
    } catch (e) {
        console.log(`Failed while fetching series: ${e}`);
    }
    return serieses;
}

const fetchingNumberOfSeasons = async (series) => {
    let numOfSeasons = 0;
    try {
        const seriesResponse = await axios.get(process.env.TMDB_API_URL + `tv/${series.id}?api_key=` + process.env.TMDB_API_KEY, {  
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        });
        numOfSeasons = seriesResponse.data.number_of_seasons;
    } catch (e) {
        console.log(`Failed while fetching number of seasons of series: ${e}`);
    }
    return numOfSeasons;
}

const insertSerieses = async (serieses) => {
    let response = [];
    try {
        response = await Serieses.insertMany(serieses);
    } catch (e) {
        console.log(`Failed while inserting serieses to DB: ${e}`);
    } 
    return response;
};

const initSeriesList = async () => {
    const fetchedSerieses = await fetchingSeries();
    const serieses = await Promise.all(fetchedSerieses.map(async (series) => {
        const numOfSeasons = await fetchingNumberOfSeasons(series);
        return {...series, number_of_seasons: numOfSeasons};
    }));
    const response = await insertSerieses(serieses);
    response.forEach((series) => {
        initSeasonsList(series);
    });
};

module.exports = {
    initSeriesList
};