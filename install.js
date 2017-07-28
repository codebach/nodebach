//=======================
// INSTALLATION =========
//=======================
var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');

var config = require('./app/config/config');
var User   = require('./src/models/user');

mongoose.connect(config.database, { useMongoClient: true });

app.get('/init', function (req, res) {
    // remove all users
    User.remove(function (err, removed) {});

    // create admin
    var admin = new User({
        name: 'Admin',
        username: 'admin',
        password: 'password',
        roles: ['admin']
    });

    // save the sample user
    admin.save(function (err) {
        if (err) throw err;
        res.json({success: true});
    });
});

var port = process.env.PORT || 3000;
app.listen(port);
