const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
});

const Genres = mongoose.model('genre', genresSchema);
module.exports = Genres;