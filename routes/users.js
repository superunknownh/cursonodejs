var express = require('express');
var router = express.Router();

router.get('/add', function(req, res, next) {
	var user = {
		user_name: 'Hugo',
		user_password: '12345',
		user_fullname: 'Hugo SL',
		user_description: 'My life is private...',
		user_type: 1
	}
	User.create(user).then(function(new_user) {
		res.send(new_user);
	});
});

module.exports = router;
