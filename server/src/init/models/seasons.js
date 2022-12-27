const axios = require('axios');
const { insertEpisodes } = require('./episodes');
const Seasons = require('../../db/models/season');

const fetchSeason = async (series, seasonNumber) => {
    let season;

    try {
        console.log(`Requesting season number ${seasonNumber} for ${series.name} (id: ${series.id})`);
        const response = await axios.get(`${process.env.TMDB_API_URL}tv/${series.id}/season/${seasonNumber}?api_key=${process.env.TMDB_API_KEY}`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" }
        });

        season = response.data;
        season.series_id = series._id;
        console.log(`Got season number ${seasonNumber} for ${series.name} (id: ${series.id})`);
    } catch (e) {
        console.log(`Failed while fetching season number ${seasonNumber} for ${series.name} (id: ${series.id}): ${e}`);
    }

    return season;
};

const insertSeasons = async (seasons) => {
    try {
        await Seasons.insertMany(seasons);
        console.log(`Inserted ${seasons.length} seasons to DB`);
    } catch (e) {
        console.log(`Failed while inserting seasons to DB: ${e}`);
    }
};

const initSeasons = async (series) => {
    const seasons = [];

    for (let currSeason = 1; currSeason <= series.number_of_seasons; currSeason++) {
        const season = await fetchSeason(series, currSeason);
        season.episode_ids = await insertEpisodes(season.episodes, series._id);
        seasons.push(season);
    }

    await insertSeasons(seasons);
};

module.exports = {
    initSeasons
};