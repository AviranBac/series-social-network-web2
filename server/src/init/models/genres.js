const axios = require('axios');
const Genres = require('../../db/models/genre');

const fetchGenres = async () => {
    let genres = [];

    try {
        console.log("Requesting all genres from TMDB");
        const response = await axios.get(`${process.env.TMDB_API_URL}genre/tv/list`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US'
            }
        });

        genres = response.data.genres;
        console.log(`Got ${genres.length} genres from TMDB: ${JSON.stringify(genres)}`);
    } catch (e) {
        console.log(`Failed while fetching genres: ${e}`);
    }

    return genres;
};

const initGenres = async () => {
    const genres = await fetchGenres();

    let response = [];
    try {
        response = await Genres.insertMany(genres);
        console.log(`Inserted ${genres.length} genres to DB`);
    } catch (e) {
        console.log(`Failed while inserting genres to DB: ${e}`);
    }
    return response.map(genre => {
        const { id } = genres.find(genreDb => genre.name === genreDb.name);
        return { name: genre.name, _id: genre._id, id };
    });
};

module.exports = {
    initGenres
};