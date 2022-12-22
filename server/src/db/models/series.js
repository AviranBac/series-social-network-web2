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
    firstAirDate: {
        type: Date,
    },
    originalLanguage: {
        type: String,
    },
    overview: {
        type: String,
    },
    posterPath:{
        type: String,
    },
    popularity: {
        type: Number,
    },
    voteAverage: {
        type: Number,
    },
    voteCount: {
        type: Number,
    },
    numberOfEpisodes: {
        type: Number,
    },
    numberOfSeasons: {
        type: Number,
    },
    geners: {
        type: [Genre.schema]
    }
    //seasons
    // private SeriesStatus status;
});

const Series = mongoose.model('series', seriesSchema);
module.exports = Series;