var express = require('express');
var auth = require('./auth');

const router = express.Router();

// Index Route
router.get('/', function (req, res) {
    res.send('Welcome to Nodebach!');
});

router.use(auth);

module.exports = router;
