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
    episodeNumber: {
        type: Number,
        require: true
    },
    seriesId: {
        type: Series.schema,
        require: true
    },
    airDate: {
        type: Date
    },
    overview: {
        type: String
    },
    stillPath: { 
        type: String
    },
    voteAverage: {
        type: Number
    },
    voteCount: {
        type: Number
    },
});

const Episodes = mongoose.model('episode', episodesSchema);
module.exports = Episodes;