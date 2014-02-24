var mongoose = require('mongoose'),
    inviteModel = require('./invite').inviteModel,
    bcrypt = require('bcryptjs');
schema = mongoose.Schema;

    /*    User Schema     */

userSchema = new schema({
    email: { type: String, required: true, unique: true },
    username : {type:String, required : true},
    firstName: String,
    lastName: String,
    salt: String,
    password: { type: String, required: true },
    roles: [String],
    acheived: [String],
    about: String,
    courseViewed: [{ type: schema.Types.ObjectId, ref: 'course' }],
    courseCreated: [{ type: schema.Types.ObjectId, ref: 'course' }]
});

userSchema.methods.createSalt = function () {
    return bcrypt.genSaltSync(10);
};

userSchema.methods.createHash = function (password, salt) {
    return bcrypt.hashSync(password, salt);
};

userSchema.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.destroyInviteToken = function (email) {
    inviteModel.findOneAndRemove({ 'email': email }, function (err, obj) {
        if (err) {
            console.log("Error Removing the associated token "+err);
        }
console.log("successfully removed "+obj);
    })
}

exports.userModel = mongoose.model('user', userSchema);