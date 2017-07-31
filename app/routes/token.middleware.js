var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        // verify token
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Token not valid'});
            }

            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }
};
