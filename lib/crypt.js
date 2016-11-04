var bcrypt = require('bcrypt-nodejs');

exports.encryptPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

exports.comparePassword = function(password, originalPassword) {
	return bcrypt.compareSync(password, originalPassword);
}