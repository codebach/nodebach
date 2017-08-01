var express = require('express');
var jwt     = require('jsonwebtoken');
var config  = require('../config/config');
var User    = require('../models/user');

const router = express.Router();

router.post('/authenticate', function (req, res) {
    User.findOne({username: req.body.username, password: req.body.password}, function (err, user) {
        if (err) throw err;

        if (!user) {
            return res.json({success: false, message: 'User not found'});
        }

        // create a token
        var token = jwt.sign(user, config.secret, {
            expiresIn: parseInt(config.tokenTime)
        });

        res.json({
            success: true,
            token: token
        });
    });
});

module.exports = router;