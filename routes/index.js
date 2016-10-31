var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login' });
});

router.post('/login-check', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	console.log('username:', username);
	console.log('password:', password);

	if (username == 'root') {
		if (password == '123') {
			res.redirect('/home');
		} else {
			res.send('wrong password!');
		}
	} else {
		res.send('username not found!');
	}
});

router.get('/home', function(req, res, next) {
	res.render('home', { title: 'Home' });
});

module.exports = router;
