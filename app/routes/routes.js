var express = require('express');

const router = express.Router();

// Index Route
router.get('/', function (req, res) {
    res.send('Welcome to Nodebach!');
});

module.exports = router;
