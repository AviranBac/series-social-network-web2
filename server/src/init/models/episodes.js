const Episodes = require('../../db/models/episode');

const insertEpisodes = async (episodes, seriesId) => {
    const episodesWithSeriesId = episodes.map((episode) => ({ ...episode, series_id: seriesId }));

    let response;
    try {
        response = await Episodes.insertMany(episodesWithSeriesId);
        console.log(`Inserted ${episodesWithSeriesId.length} episodes to DB`);
    } catch (e) {
        console.log(`Failed while inserting episodes to DB: ${e}`);
    }

    return response.map(episode => episode._id);
}

module.exports = {
    insertEpisodes
};