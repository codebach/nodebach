// ============================
// LOAD PACKAGES AND FILES ====
// ============================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken');
var config = require('./app/config/config');
var User   = require('./src/models/user');


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
app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + config.port + '/api');
});

app.post('/authenticate', function (req, res) {
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

// api routes
var apiRoutes = express.Router();

apiRoutes.use(function (req, res, next) {
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
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

app.use('/api', apiRoutes);


// =======================
// START SERVER ==========
// =======================
app.listen(config.port);
console.log('Go to http://localhost:' + config.port);
