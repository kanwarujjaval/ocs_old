var inviteModel = require('../models/invite.js').inviteModel;
var validator = require("validator");
var mailer = require("../service/mailer.js");

exports.createInvite = function (req, res, next) {
    /*
     * This function creates invitation for an email send in the POST data form body for path /invite
     * Checks if the email is valid only then the body runs
     */
    if (validator.isEmail(req.body.email)) {
        inviteModel.findOne({ 'email': req.body.email }, function (err, invitation) {
            if (err) {
                res.send(err);
            }
            else
                if (invitation) {
                    res.send({
                        "message": "Invite already Exists",
                        "name": "emailExists",
                        "errors": null
                    }
                    );
                }
                else {
                    var newInvite = new inviteModel();
                    newInvite.email = req.body.email;
                    newInvite.token = newInvite.genToken();
                    newInvite.invited = false;
                    newInvite.save(function (err) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send({
                                "message": "Invite Created!",
                                "name": "inviteSuccess",
                                "errors": null
                            });
                        }
                    });
                }
        })
    }
    else {
        res.send({
            "message": "The sent value is not an email",
            "name": "invalidData",
            "errors": {
                "inactive": {
                    "name": "ivalidData",
                    "message": "Data sent of invalid format",
                    "path": "invite"
                }
            }
        });
    }
}

exports.verifyToken = function (req, res, next) {
    /*
     * This verifies the token if /signup/:token is accessed
     * only allows the signup page if token exists
     */
    inviteModel.findOne({ 'token': req.params.token }, function (err, invitation) {
        if (err) {
            res.send(err);
        }
        if (invitation) {
            next();
        }
        else {
            res.send({
                "message": "Invitation code invalid",
                "name": "noInvite",
                "errors": {
                    "invalidInvite": {
                        "name": "invalidInvite",
                        "message": "Invitation code used does no exist",
                        "path": req.originalUrl
                    }
                }
            });
        }
    });
};

exports.isInvited = function (req, res, next) {
    /*
     * Checks against a given email address if token exists and invite = true
     * takes to authentication api if true and exists
     */
    if (validator.isEmail(req.body.email)) {
        inviteModel.findOne({ 'email': req.body.email }, function (err, invitation) {
            if (err) {
                res.send(err);
            }
            if (invitation) {
                if (invitation.invited) {
                    return next();
                }
                res.send({
                    "message": "Invitation Expired or not activated",
                    "name": "inactiveInvite",
                    "errors": {
                        "inactive": {
                            "name": "inactiveInvite",
                            "message": "invitation has not been activated",
                            "path": req.originalUrl
                        }
                    }
                });
            }
            else {
                res.send({
                    "message": "Invite code does not match the email used",
                    "name": "emailMatchFailed",
                    "errors": {
                        "emailMatch": {
                            "name": "emailMatchFail",
                            "message": "The email used does not match the associated email for the invite code used.",
                            "path": req.originalUrl
                        }
                    }
                });
            }
        });
    }
};


exports.inviteNow = function (req, res, next) {
    inviteModel.findOneAndUpdate({ 'email': req.params.email }, { 'invited': true }, function (err, invitedUser) {
        if (err) {
            res.send(err);
        }
        else {
            mailer.sendInviteMail(res,req.params.email,"<p>This is another test mail</p><p>PLease do not flag this because it is for api testing purposes</p>","API test Email");
        }
    });
};