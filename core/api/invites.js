var inviteModel = require('../models/invite.js').inviteModel;

exports.getInvites = function (req, res, next) {
    inviteModel.find({}).exec(function (err, invites) {
        if (err) {
            res.send(err);
        }
        if (!invites) {
            res.send("no invites");
        }
        else {
            res.send(invites);
        }
    });
}