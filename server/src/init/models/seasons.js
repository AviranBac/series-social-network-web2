const axios = require('axios');
const { insertEpisodes } = require('./episodes');
const Seasons = require('../../db/mongo/models/season');

const fetchSeason = async (series, seasonNumber) => {
    let season;

    try {
        const response = await axios.get(`${process.env.TMDB_API_URL}tv/${series.id}/season/${seasonNumber}`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US'
            }
        });

        season = response.data;
        season.series_id = series._id;
        console.log(`Got season number ${seasonNumber} for ${series.name}`);
    } catch (e) {
        console.log(`Failed while fetching season number ${seasonNumber} for ${series.name}: ${e}`);
    }

    return season;
};

const insertSeason = async (season, seriesName) => {
    let seasonInDB;

    try {
        seasonInDB = new Seasons(season).save();
        console.log(`Inserted season ${season.season_number} for series ${seriesName} to DB`);
    } catch (e) {
        console.log(`Failed while inserting season number ${season.season_number} for series ${seriesName} to DB: ${e}`);
    }

    return seasonInDB;
};

const initSeasons = async (series) => {
    for (let currSeason = 1; currSeason <= series.number_of_seasons; currSeason++) {
        const season = await fetchSeason(series, currSeason);

        if (season) {
            let seasonInDB = await insertSeason(season, series.name);
            await insertEpisodes(series, seasonInDB, season.episodes);
        }
    }
};

module.exports = {
    initSeasons
};