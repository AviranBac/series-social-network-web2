const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('working');
});

router.get('/:id');

router.get('/filters');

router.get('/commonAmongFollowing');

router.get('/watched');

router.get('/topRated');

router.get('/popular');

module.exports = router;