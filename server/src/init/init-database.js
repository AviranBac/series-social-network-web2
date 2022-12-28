const { initSeries } = require('./models/series');
const { initGenres } = require('./models/genres');

const initDB = async () => {
    const genres = await initGenres();
    await initSeries(genres);
};

module.exports = {
    initDB
};