const { initSeriesList } = require('./models/series');
const { initGenresList } = require('./models/genres');

const initDB = async () => {
    initSeriesList();
    initGenresList();
};

module.exports = {
    initDB,
};