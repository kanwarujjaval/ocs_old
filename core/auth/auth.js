﻿var passport = require('passport');
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

exports.inviteNow = function (req, res, next) {
    inviteAuth.inviteNow(req, res, next);
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
            res.send({
                "message": "Unable to create User",
                "name": "signupFail",
                "errors": {
                    "signupFail": {
                        "name": "signupFail",
                        "message": "Unable to create the specified user",
                        "path": req.originalUrl
                    }
                }
            });
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.send({
                    "message": "Signup Successful",
                    "name": "signupSuccess",
                    "errors": null
                });
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
            res.send({
                "message": "Login Failed, Invalid Username and Password Combination",
                "name": "loginFailed",
                "errors": {
                    "loginFailed": {
                        "name": "loginfailed",
                        "message": "Your username or password is invalid",
                        "path": req.originalUrl
                    }
                }
            });
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                //res.redirect('/profile');
                res.send({
                    "message": "Login Successful",
                    "name": "loginSuccess",
                    "errors": null
                });
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
        //next(); //temporarily disabled the login requirement till the signin is implemented in the angular frontend
        res.send({
            "message": "Unauthenticated, Login to view this",
            "name": "unauthenticated",
            "errors": {
                "unauthenticated": {
                    "name": "unauthenticated",
                    "message": "Login to view this resource",
                    "path": req.originalUrl
                }
            }
        });
    }
}

exports.isCourseCreator = function (req, res, next) {
    userModel.findOne({ "_id": req.session.passport.user }, function (err, user) {
        if (err) {
            res.send(500, err);
        }
        else if (!user) {
            res.send({
                "message": "Invalid Request",
                "name": "invalidRequest",
                "errors": {
                    "invalidRequest": {
                        "name": "invalidRequest",
                        "message": "Request invalid",
                        "path": req.originalUrl
                    }
                }
            });
        }
        else {
            for (i = 0; i < user.courseCreated.length; i++) {
                if (req.params.id == user.courseCreated[i]) {
                    return next();
                }
            }
            res.send({
                "message": "You do not own this resource",
                "name": "notOwner",
                "errors": {
                    "notOwner": {
                        "name": "notOwner",
                        "message": "You do not own this resource",
                        "path": req.originalUrl
                    }
                }
            });
        }
    })
}