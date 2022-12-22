const mongoose = require('mongoose');
const Series = require('./series');
const Episodes = require('./episode');

const seasonsSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    seasonNumber: {
        type: Number,
        require: true
    },
    airDate: {
        type: Date
    },
    overview: {
        type: String
    },
    posterPath: {
        type: String
    },
    epsidoes: {
        type: [Episodes.schema],
        require: true
    },
    seriesId: {
        type: Series.schema,
        require: true
    }
});

const Seasons = mongoose.model('season', seasonsSchema);
module.exports = Seasons;