var express = require('express');
var router = express.Router();

router.get('/', Auth.isBEAuthenticated, function(req, res, next) {
	User.find({where: {user_id : req.user.user_id}}).then(function(user) {
		req.flash('infoMessage', 'Please login to access backend!');
		res.send('Welcome back <strong>' + user.user_name + '</strong> <a href="/admin/logout">logout</a>');
	});
});

router.get('/login', function(req, res, next) {
	req.flash('infoMessage', 'Please enter your credentials.');
	res.render('login', {
		title: 'Login',
		infoMessage: req.flash('infoMessage'),
		errorMessage: req.flash('errorMessage')
	});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/admin/login');
});

module.exports = router;