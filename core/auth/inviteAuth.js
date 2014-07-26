var inviteModel = require('../models/invite.js').inviteModel;

exports.createInvite = function (req, res, next) {
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

exports.verifyToken = function (req, res, next) {
    inviteModel.findOne({ 'token': req.params.token }, function (err, invitation) {
        if (err) {
            res.send(err);
        }
        if (invitation) {
            next();
        }
        else {
            res.send({
                "message": "Invitation not activated",
                "name": "noInvite",
                "errors": null
            });
        }
    });
};

exports.isInvited = function (req, res, next) {
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
                        "path": "invite"
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
                        "path": "invite"
                    }
                }
            });
        }
    });
};