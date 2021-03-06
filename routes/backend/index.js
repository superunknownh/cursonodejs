var express = require('express');
var router = express.Router();

router.get('/', Auth.isBEAuthenticated, function(req, res, next) {
	User.find({where: {user_id : req.user.user_id}}).then(function(user) {
		res.render('backend/index', {
			title: 'Backend',
			user: user,
			infoMessage: req.flash('infoMessage'),
			errorMessage: req.flash('errorMessage')
		});
	});
});

router.get('/login', Auth.passLogin, function(req, res, next) {
	req.flash('infoMessage', 'Please enter your credentials.');
	res.render('backend/login', {
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