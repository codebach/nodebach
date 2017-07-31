// ============================
// LOAD PACKAGES AND FILES ====
// ============================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var config = require('./app/config/config');
var routes = require('./app/routes/routes');


// =======================
// CONFIGURATION =========
// =======================
mongoose.connect(config.database, { useMongoClient: true });

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if (config.env == 'dev') {
    app.use(morgan('dev'));
}


// =======================
// ROUTES ================
// =======================
app.use(routes);


// =======================
// START SERVER ==========
// =======================
app.listen(config.port);
console.log('Go to http://localhost:' + config.port);
