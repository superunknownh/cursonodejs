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

exports.hasPrivileges = function(user_type) {
	return function (req, res, next) {
		if (req.isAuthenticated()) {
			if (req.user.local) {
				if (req.user.userType == 'root') {
	        		return next();
				} else {
					res.redirect('/');
				}
			}
		}
	}
}
