exports.isBEAuthenticated = function(req, res, next) {
	if (req.isAuthenticated() && req.user) {
		return next();
	}
	res.redirect('/admin/login');
}

exports.passLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/admin');
}

exports.hasPrivileges = function(user_types) {
	console.log('user_types:', user_types);
	return function (req, res, next) {
		ut = req.user.user_type;
		console.log('ut:', ut);
		if (Util.inArray(ut, user_types)) {
			next();
		} else {
			req.flash('errorMessage', 'You don\'t have access to this route, please contact Admin');
			res.redirect('/admin');
		}
	}
}
