const mongoose = require('mongoose');
const Series = require('./series');

const episodesSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    episode_number: {
        type: Number,
        require: true
    },
    show_id: {
        type: Series.schema,
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