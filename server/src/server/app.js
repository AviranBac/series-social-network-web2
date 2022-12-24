const axios = require('axios');
const cors = require('cors');
const express = require('express');
const Series = require('../db/models/series');
const Genres = require('../db/models/genre');
const Seasons = require('../db/models/season');
const bodyParser = require('body-parser');
const websiteUrl = "https://api.themoviedb.org/3/";
const apiKey = "";
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));


app.get('/series', async (req, res) => {
    let series = await getMostPopularSeries();
    console.log(series.length);
   await Series.insertMany(series, (err, docs) => {})    
    res.send(series);
  });

  
app.get('/genres', async (req, res) => {
  let genres = await getGenreList();
  console.log(genres.length);
 await Genres.insertMany(genres, (err, docs) => {})    
  res.send(genres);
});

  async function getMostPopularSeries() {
    try {
      let seriesList = [];
  
      const response = await axios.get(websiteUrl+'tv/popular', {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1,
        limit: 50
      }
    });
    seriesList = response.data.results

      for (const series of seriesList) {
        const seriesResponse = await axios.get(websiteUrl+`tv/${series.id}?api_key=`+apiKey);
        series.number_of_seasons = seriesResponse.data.number_of_seasons;
        const a = await getSeasonsForSeries(series);
      }
      return seriesList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

async function getGenreList() {
  const response = await axios.get(websiteUrl + 'genre/tv/list', {
    params: {
      api_key: apiKey,
      language: 'en-US',
    }
  });

  return response.data.genres;
}

async function getSeasonsForSeries(series) {
  const seasons = [];

    for (let i = 1; i <= series.number_of_seasons; i++) {
    const response = await axios.get(websiteUrl+`tv/${series.id}/season/${i}?api_key=`+apiKey, {    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  });
    const season = response.data;
    await Seasons.insertMany(season, (err, docs) => {})    
  }
  return seasons;
}
  

// app.get('/series/:id');

// app.get('/series/filters');

// app.get('/series/commonAmongFollowing');

// app.get('/series/watched');

// app.get('/series/topRated');

// app.get('/series/popular');


module.exports = app;