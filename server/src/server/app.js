require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { initDB } = require("../init/init-database");
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));

app.post('/scraping/trigger', async (req, res) => {
    await initDB();
    res.send();
});

// app.get('/series', async (req, res) => {

// });


// app.get('/genres', async (req, res) => {

// });


// app.get('/series/:id');

// app.get('/series/filters');

// app.get('/series/commonAmongFollowing');

// app.get('/series/watched');

// app.get('/series/topRated');

// app.get('/series/popular');


module.exports = app;