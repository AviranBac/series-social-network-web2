const Episodes = require('../../db/mongo/models/episode');

const insertEpisodes = async (series, season, episodes) => {
    const episodesWithRefIds = episodes.map((episode) => {
        return { ...episode, season_id: season._id, still_path: `https://image.tmdb.org/t/p/w500${episode.still_path}`}
    });

    let response;
    try {
        response = await Episodes.insertMany(episodesWithRefIds);
        console.log(`Inserted ${episodesWithRefIds.length} episodes from series ${series.name} to DB`);
    } catch (e) {
        console.log(`Failed while inserting episodes to DB: ${e}`);
    }

    return response.map(episode => episode._id);
}

module.exports = {
    insertEpisodes
};