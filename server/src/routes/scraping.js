const express = require("express");
const { initDB } = require("../init/init-database");
const router = express.Router();

router.post('/trigger', async (req, res) => {
    await initDB();
    res.send();
});

module.exports = {
    scrapingRouter: router
};