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
var port = process.env.PORT || 3000;
mongoose.connect(config.database);
app.set('secret', config.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


// =======================
// ROUTES ================
// =======================
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/init', function(req, res) {
	// remove all users
	User.remove(function(err, removed) {
		console.log('remove all users!');
	});

	// create admin
	var admin = new User({ 
		name: 'Admin',
		username: 'admin',
		password: 'password',
		admin: true 
	});

	// save the sample user
	admin.save(function(err) {
		if (err) throw err;

		console.log('Setup: successful!');
		res.json({ success: true });
	});
});

app.post('/authenticate', function (req, res) {
    User.findOne({username: req.body.username, password: req.body.password}, function (err, user) {
        if (err) throw err;

        if (!user) {
            return res.json({ success: false, message: 'User not found'});
        }

        // create a token
        var token = jwt.sign(user, app.get('secret'), {
            expiresIn: 1440 // expires in 24 hours
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
        jwt.verify(token, app.get('secret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Token not valid' });
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
apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

app.use('/api', apiRoutes);


// =======================
// START SERVER ==========
// =======================
app.listen(port);
console.log('Go to http://localhost:' + port);