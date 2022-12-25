const axios = require('axios');
const { insertEpisodes } = require('./episodes');
const Seasons = require('../../db/models/season');

const fetchingSeason = async (series, seasonNumber) => {
    let season;
    try {
        const response = await axios.get(process.env.TMDB_API_URL + `tv/${series.id}/season/${seasonNumber}?api_key=` + process.env.TMDB_API_KEY, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" }
        });
        season = response.data;
        season.seriesId = series._id;
    } catch (e) {
        console.log(`Failed while fetching season: ${e}`);
    }
    return season;
};

const insertSeasons = async (seasons) => {
    try {
        await Seasons.insertMany(seasons);
    } catch (e) {
        console.log(`Failed while inserting seasons to DB: ${e}`);
    }
};

const initSeasonsList = async (series) => {
    const seasons = [];
    for (let currSeason = 1; currSeason <= series.number_of_seasons; currSeason++) {
        const season = await fetchingSeason(series, currSeason);
        const episodesIds = await insertEpisodes(season.episodes, series._id);
        season.episodes = episodesIds;
        seasons.push(season);
    }
   await insertSeasons(seasons);
};

module.exports = {
    initSeasonsList
};