var express 	= require('express');
var router 		= express.Router();
var passport 	= require('passport');

router.post('/login', Secure.sanitize, passport.authenticate('local-login', {
    successRedirect : '/admin',
    failureRedirect : '/admin/login',
    failureFlash 	: true
}));

module.exports = router;
