const { initSeries } = require('./models/series');
const { initGenres } = require('./models/genres');

const initDB = async () => {
    await initGenres();
    await initSeries();
};

module.exports = {
    initDB
};