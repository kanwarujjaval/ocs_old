var mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    schema = mongoose.Schema;

inviteSchema = new schema({
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
    role: { type: String },
    invited: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
    invitationSent: { type: Boolean, default: false },
    invitationSentOn: { type: Date },
    signedUpOn: { type: Date }
});

inviteSchema.methods.genToken = function () {
    return uuid.v1();
};

exports.inviteModel = mongoose.model('invite', inviteSchema);