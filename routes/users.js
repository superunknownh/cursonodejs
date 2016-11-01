var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.redirect('/users/list');
});

router.get('/list', function(req, res, next) {
	User.all({include: {model:db['UserType'], as:'UserType'}}).then(function(users) {
		res.render('users/list', {
			title : 'List users',
			users: users
		});
	});
});

router.get('/add', function(req, res, next) {
	UserType.all().then(function(users_types) {
		res.render('users/add', {
			title : 'Add user',
			users_types: users_types
		});
	});
});

router.post('/add', function(req, res, next) {
	var new_user = {
		user_name: req.body.name,
		user_password: req.body.password,
		user_fullname: req.body.fullname,
		user_description: req.body.description,
		user_type: req.body.user_type
	}
	User.create(new_user).then(function(saved_user) {
		res.redirect('/users/list');
	});
});

router.get('/edit/:id', function(req, res, next) {
	User.find({where: {user_id: req.params.id}}).then(function(user) {
		if (user) {
			UserType.all().then(function(users_types) {
				res.render('users/edit', {
					title : 'Edit user',
					user: user,
					users_types: users_types
				});
			});
		} else {
			res.sendStatus(404);
		}
	});
});

router.post('/edit', function(req, res, next) {
	var edit_user = {
		user_id: req.body.id,
		user_name: req.body.name,
		user_password: req.body.password,
		user_fullname: req.body.fullname,
		user_description: req.body.description,
		user_type: req.body.user_type
	}
	User.find({where: {user_id: edit_user.user_id}}).then(function(user_found) {
		if (user_found) {
			user_found.update(edit_user).then(function(saved_user) {
				res.redirect('/users/list');
			});	
		} else {
			res.sendStatus(404);
		}
	});
});

router.get('/delete/:id', function(req, res, next) {
	User.find({where: {user_id: req.params.id}}).then(function(user_found) {
		if (user_found) {
			user_found.destroy().then(function(user_destroyed) {
				res.redirect('/users/list');
			});
		} else {
			res.sendStatus(404);
		}
	});
});

module.exports = router;
