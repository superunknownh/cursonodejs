var LocalStrategy = require('passport-local').Strategy;

var db = require('../models');
var User = db['User'];

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        User.find({where:{user_id: user.user_id}}).then(function(user) {
            if (user) {
                done(null, user);
            } else {
                done(null, null);
            }
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, username, password, done) {
        if (username) username = username.toLowerCase();
        process.nextTick(function() {
            User.find({ where: {user_name : username}}).then(function(user) {
                if (!user) return done(null, false, req.flash('errorMessage', 'User not found!'));
                if (!Crypt.comparePassword(password, user.user_password)) return done(null, false, req.flash('errorMessage', 'Password incorrect!'));
                else return done(null, user);
            });
        });
    }));
};
