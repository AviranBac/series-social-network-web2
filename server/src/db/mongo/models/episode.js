const mongoose = require('mongoose');
const Seasons = require("./season");

const episodesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    episode_number: {
        type: Number,
        require: true
    },
    season_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Seasons.modelName,
        require: true
    },
    air_date: {
        type: Date
    },
    overview: {
        type: String
    },
    still_path: {
        type: String
    },
    vote_average: {
        type: Number
    },
    vote_count: {
        type: Number
    },
});

const Episodes = mongoose.model('episode', episodesSchema);
module.exports = Episodes;