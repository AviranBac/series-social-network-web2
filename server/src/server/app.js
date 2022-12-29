require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { userRouter } = require("../routes/users");
const { scrapingRouter } = require("../routes/scraping");
const { followersRouter } = require("../routes/follow");
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));

app.use('/users', userRouter);
app.use('/scraping', scrapingRouter);
app.use('/follows', followersRouter);

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