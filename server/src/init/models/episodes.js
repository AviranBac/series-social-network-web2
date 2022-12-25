const Episodes = require('../../db/models/episode');

const insertEpisodes = async (episodes, seriesId) => {
    const mapedEpisodes = episodes.map((episode) =>{ return {...episode, seriesId} });
    
    let response;
    try {
        response = await Episodes.insertMany(mapedEpisodes);
    } catch (e) {
        console.log(`Failed while inserting episodes to DB: ${e}`);
    }
    return response.map(episode => episode._id);
}

module.exports = {
    insertEpisodes
};