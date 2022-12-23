const axios = require('axios');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const websiteUrl = "https://api.themoviedb.org/3/";
const apiKey = "4287ce9fa98248ad849cf2e6502ff51a";
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));


app.get('/series', async (req, res) => {
    let series = getMostPopularSeries();
    console.log(series);
  });
  
  async function getMostPopularSeries() {
    try {
      let seriesList = [];
      let page = 1;
      let totalPages = 1;
  
      while (seriesList.length < 50 && page <= totalPages) {
        const response = await axios.get(websiteUrl, {
          params: {
            api_key: apiKey,
            language: 'en-US',
            page: page
          }
        });
  
        seriesList = [...seriesList, ...response.data.results];
        page = response.data.page + 1;
        totalPages = response.data.total_pages;
      }
  
      return seriesList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  

app.get('/series/:id');

app.get('/series/filters');

app.get('/series/commonAmongFollowing');

app.get('/series/watched');

app.get('/series/topRated');

app.get('/series/popular');


module.exports = app;