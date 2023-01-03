require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { userRouter } = require("../routes/users");
const { scrapingRouter } = require("../routes/scraping");
const seriesRouter = require('../routes/series');
const { followRouter } = require("../routes/follows");
const { watchlistRouter } = require("../routes/watchlist");
const { wishlistRouter } = require("../routes/wishlist");
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));

app.use('/follows', followRouter);
app.use('/users', userRouter);
app.use('/scraping', scrapingRouter);
app.use('/watchlist', watchlistRouter);
app.use('/wishlist', wishlistRouter);

app.use('/series', seriesRouter);

module.exports = app;