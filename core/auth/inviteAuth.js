var inviteModel = require('../models/invite.js').inviteModel;

exports.createInvite = function (req, res, next) {
    inviteModel.findOne({ 'email': req.body.email }, function (err, invitation) {
        if (err) {
            res.send(err);
        }
        else
        if (invitation) {
            res.send("You already have a pending invite");
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
                    res.send("You have been invited");
                }
            });
        }
    })
}

exports.verifyToken = function (req, res, next) {
    inviteModel.findOne({ 'token': req.params.token }, function (err, invitation) {
        if (err) {
            res.send("error encountered" + err);
        }
        if (invitation) {
            next();
        }
        else {
            res.send("invitation not active");
        }
    });
};

exports.isInvited = function (req, res, next) {
    inviteModel.findOne({ 'email': req.body.email }, function (err, invitation) {
        if (err) {
            res.send("error encountered" + err);
        }
        if (invitation) {
            if (invitation.invited) {
                return next();
            }
            res.send("Invitation expired or not activated");
        }
        else {
            res.send("invitation does not match the email used");
        }
    });
};