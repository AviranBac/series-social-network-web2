const mongoose = require('mongoose');
const Genres = require('./genre');

const statusSeries = ['Returning Series', 'Ended', 'Canceled', 'In Production'];

const seriesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    first_air_date: {
        type: Date,
    },
    original_language: {
        type: String,
    },
    overview: {
        type: String,
    },
    poster_path: {
        type: String,
    },
    popularity: {
        type: Number,
    },
    vote_average: {
        type: Number,
    },
    vote_count: {
        type: Number,
    },
    number_of_seasons: {
        type: Number,
    },
    number_of_episodes: {
        type: Number,
    },
    status: {
        type: String,
        enum: statusSeries,
    },
    genre_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Genres.modelName,
        require: true
    }]
});

const Series = mongoose.model('series', seriesSchema);
module.exports = Series;