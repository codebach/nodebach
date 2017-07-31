var express = require('express');
var auth = require('./auth');
var api = require('./api/user');

const router = express.Router();

// Index Route
router.get('/', function (req, res) {
    res.send('Welcome to Nodebach!');
});

router.use(auth);
router.use('/api', api);

module.exports = router;
