exports.isBEAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		if (req.user) {
        	return next();
		}
	}
	res.redirect('/admin/login');
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
