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
        type: [Episodes.schema],
        require: true
    },
    show_id: {
        //type: Series.schema,
        type: Number,
        require: true
    }
});

const Seasons = mongoose.model('season', seasonsSchema);
module.exports = Seasons;