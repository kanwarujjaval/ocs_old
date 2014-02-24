var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js').userModel;

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            User.findOne({ 'email': email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false);
                } else {
                    var newUser = new User();
                    newUser.email = email;
                    newUser.salt = newUser.createSalt();
                    newUser.password = newUser.createHash(password, newUser.salt);
                    newUser.username = req.body.username;
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        newUser.destroyInviteToken(newUser.email);
                        return done(null, newUser);
                    });
                }

            });

        }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({ 'email': email }, function (err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false);
            if (!user.authenticate(password))
                return done(null, false);
            return done(null, user);
        });

    }));

}