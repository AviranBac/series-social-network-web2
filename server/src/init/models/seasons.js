const axios = require('axios');
const { insertEpisodes } = require('./episodes');
const Seasons = require('../../db/models/season');

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

const insertSeasons = async (seasons, seriesName) => {
    try {
        await Seasons.insertMany(seasons);
        console.log(`Inserted ${seasons.length} seasons for series ${seriesName} to DB`);
    } catch (e) {
        console.log(`Failed while inserting seasons for series ${seriesName} to DB: ${e}`);
    }
};

const initSeasons = async (series) => {
    const seasons = [];

    for (let currSeason = 1; currSeason <= series.number_of_seasons; currSeason++) {
        const season = await fetchSeason(series, currSeason);

        if (season) {
            season.episode_ids = await insertEpisodes(season.episodes, series);
            seasons.push(season);
        }
    }

    await insertSeasons(seasons, series.name);
};

module.exports = {
    initSeasons
};