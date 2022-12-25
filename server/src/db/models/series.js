const mongoose = require('mongoose');
const Genre = require('./genre');

const seriesSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
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
    poster_path:{
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
    genre_ids: {
       // type: [Genre.schema]
       type: [Number]
    }
});

const Series = mongoose.model('series', seriesSchema);
module.exports = Series;