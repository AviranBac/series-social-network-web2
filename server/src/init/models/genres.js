const axios = require('axios');
const Genres = require('../../db/models/genre');

const fetchingGenres = async () => {
    let genres = [];
    try {
        const response = await axios.get(process.env.TMDB_API_URL + 'genre/tv/list', {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
            }
        });
        genres = response.data.genres;
    } catch (e) {
        console.log(`Failed while fetching genres: ${e}`);
    }
    return genres;
}

const initGenresList = async () => {
    const genres = await fetchingGenres();
    try {
        await Genres.insertMany(genres);
    } catch (e) {
        console.log(`Failed while inserting genres to DB: ${e}`);
    }
};

module.exports = {
    initGenresList
};