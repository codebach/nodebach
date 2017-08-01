var express = require('express');
var tokenMiddleware = require('../token.middleware.js');
var User = require('../../models/user');

const router = express.Router();

router.use(tokenMiddleware);

router.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

module.exports = router;