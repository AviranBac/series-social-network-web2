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
    episode_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Episodes.modelName,
        require: true
    }],
    series_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Series.modelName,
        require: true
    }
});

const Seasons = mongoose.model('season', seasonsSchema);
module.exports = Seasons;