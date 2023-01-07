const axios = require('axios');
const { initSeasons } = require('./seasons');
const Series = require("../../db/mongo/models/series");

const fetchPopularSeries = async (genre_ids) => {
    let popularSeries = [];
    let page = 1;
    let totalPages = 50;
    const wantedLanguages = ["en", "he"];
    const seriesLimit = 100;

    while (popularSeries.length < seriesLimit && page <= totalPages) {
        try {
            console.log(`Requesting page ${page} for popular series from TMDB`);

            const response = await axios.get(`${process.env.TMDB_API_URL}tv/popular`, {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    language: 'en-US',
                    page
                },
                headers: { "Accept-Encoding": "gzip,deflate,compress" }
            });

            totalPages = response.data.total_pages;

            const fetchedSeries = await Promise.all(response.data.results
                .filter(series => wantedLanguages.includes(series.original_language))
                .map((async (series) => await fetchSingleSeries(series.id, genre_ids)))
                .filter(series => !!series)
                .slice(0, seriesLimit - popularSeries.length)
            );

            popularSeries.push(...fetchedSeries);
            console.log(`Finished Fetching page number: ${page}, total series matching criteria: ${popularSeries.length}`);
        } catch (e) {
            console.log(`Failed while fetching page ${page} of popular series: ${e}`);
        }

        page++;
    }

    return popularSeries;
}

const fetchSingleSeries = async (tmdbSeriesId, genre_ids) => {
    let series;

    try {
        const response = await axios.get(`${process.env.TMDB_API_URL}tv/${tmdbSeriesId}`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US'
            }
        });

        series = response.data;
        series.poster_path = series.poster_path ? `https://image.tmdb.org/t/p/w185${series.poster_path}` : undefined;
        series.genre_ids = series.genres.map(genre => genre_ids.filter(genreDbIds => parseInt(genreDbIds.id) === genre.id).map(genre => genre._id));
        console.log(`Got series id: ${series.id}, name: ${series.name}`);
    } catch (e) {
        console.log(`Failed while fetching series id ${tmdbSeriesId}: ${e}`);
    }

    return series;
}

const insertSeries = async (series) => {
    let response = [];
    try {
        response = await Series.insertMany(series);
        console.log(`Inserted ${series.length} series to DB`);
    } catch (e) {
        console.log(`Failed while inserting series to DB: ${e}`);
    }

    return response;
};

const initSeries = async (genre_ids) => {
    const fetchedSeries = await fetchPopularSeries(genre_ids);
    const response = await insertSeries(fetchedSeries);

    await Promise.all(response.map(async (series) => {
        const { id } = fetchedSeries.find(tmdbSeries => (tmdbSeries.name === series.name));
        const seriesCopy = JSON.parse(JSON.stringify(series)); // deep copy
        seriesCopy.id = id;
        await initSeasons(seriesCopy);
    }));
};

module.exports = {
    initSeries
};