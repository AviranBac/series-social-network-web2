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
    season_number: {
        type: Number,
        require: true
    },
    air_date: {
        type: Date
    },
    overview: {
        type: String
    },
    poster_path: {
        type: String
    },
    episodes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Episodes.modelName
        }],
        required: true
    },
    seriesId: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Series.modelName
        }],
        required: true
    }
});

const Seasons = mongoose.model('season', seasonsSchema);
module.exports = Seasons;