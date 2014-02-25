var passport = require('passport');
var inviteAuth = require('./inviteAuth');
require('./localAuth')();
var inviteModel = require('../models/invite').inviteModel;
var userModel = require('../models/user').userModel;

/*
For the Private Beta
*/
exports.createInvite = function (req, res, next) {
    inviteAuth.createInvite(req, res, next);
}

exports.isInvited = function (req, res, next) {
    inviteAuth.isInvited(req, res, next);
}

exports.verifyToken = function (req, res, next) {
    inviteAuth.verifyToken(req, res, next);
}

/*
Local Web Signup
*/

exports.signupAuthenticate = function (req, res, next) {

    var auth = passport.authenticate('local-signup', function (err, user, info) {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.send("Login Failed Try again");
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.send(user);
            });
        }
    })
    auth(req, res, next);

}

/*
Local Web Login
*/

exports.loginAuthenticate = function (req, res, next) {
    var auth = passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.send("Login Failed Try again");
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/profile');
            });
        }
    })
    auth(req, res, next);
}

/*
Check if user authenticated
*/

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.send(403, { msg: 'You need to be authenticated to access this resource' });
    }
}

exports.isCourseCreator = function (req, res, next) {
    userModel.findOne({ "_id": req.session.passport.user }, function (err, user) {
        if (err) {
            res.send(500, err);
        }
        else if (!user) {
            res.send(500, { msg: "error encountered" });
        }
        else {
            for (i = 0; i < user.courseCreated.length; i++) {
                if (req.params.id == user.courseCreated[i]) {
                    return next();
                }
            }
            res.send(403, { msg: 'You do no Own this course' });
        }
    })
}