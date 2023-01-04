require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { userRouter } = require("../routes/users");
const { scrapingRouter } = require("../routes/scraping");
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

app.get('/series', async (req, res) => {
    const series = [{"name": "aa1a", "poster_path":"https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg"}, 
    {"name": "b2bb", "poster_path":"https://image.tmdb.org/t/p/w500/peNC0eyc3TQJa6x4TdKcBPNP4t0.jpg"},
    {"name": "aa3a", "poster_path":"https://image.tmdb.org/t/p/w500/7wuKrFvbX7kAIF0ctotARsqayPo.jpg"}, 
    {"name": "bb4b", "poster_path":"https://image.tmdb.org/t/p/w500/peNC0eyc3TQJa6x4TdKcBPNP4t0.jpg"},
    {"name": "a5aa", "poster_path":"https://image.tmdb.org/t/p/w500/cvhNj9eoRBe5SxjCbQTkh05UP5K.jpg"}];
    res.send(series);

});


// app.get('/genres', async (req, res) => {

// });


// app.get('/series/:id');

// app.get('/series/filters');

// app.get('/series/commonAmongFollowing');

// app.get('/series/watched');

// app.get('/series/topRated');

// app.get('/series/popular');

module.exports = app;