var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var env = require('node-env-file');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var secret= "password"

var mongoose = require('mongoose');
var User = require('./models/users');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/runs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/runs', expressJWT({secret: secret}));
app.use('/api/users', expressJWT({secret: secret})
.unless({path: ['/api/users'], method: 'post'}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
});

app.use('/api/temperatures', require('./controllers/weather'));
app.use('/api/users', require('./controllers/user'));
app.use('/api/runs', require('./controllers/run'));

app.post('/api/auth', function(req, res) {
	User.findOne({email: req.body.email}, function(err, user) {
		if (err || !user) {
			return res.send({message: 'User not found'});
		}
		user.authenticated(req.body.password, function(err, result) {
		  if (err || !result) {
		  	return res.send({message: 'User not authenticated'});
		  } 

		  var token = jwt.sign(user, secret);
		  res.send({user: user, token: token});
		});
	});
});

app.get('/*', function(req, res){
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000);