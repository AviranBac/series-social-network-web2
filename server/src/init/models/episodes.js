const Episodes = require('../../db/models/episode');

const insertEpisodes = async (episodes, series) => {
    const episodesWithSeriesId = episodes.map((episode) => {
        return { ...episode, series_id: series._id };
    });

    let response;
    try {
        response = await Episodes.insertMany(episodesWithSeriesId);
        console.log(`Inserted ${episodesWithSeriesId.length} episodes from series ${series.name} to DB`);
    } catch (e) {
        console.log(`Failed while inserting episodes to DB: ${e}`);
    }

    return response.map(episode => episode._id);
}

module.exports = {
    insertEpisodes
};