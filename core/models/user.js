var mongoose = require('mongoose'),
    inviteModel = require('./invite').inviteModel,
    bcrypt = require('bcryptjs');
schema = mongoose.Schema;

/*    User Schema     */

userSchema = new schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique:true },
    firstName: String,
    lastName: String,
    salt: { type: String },
    password: { type: String, required: true },
    roles: [String],
    acheived: [String],
    about: String,
    courseViewed: [{ type: schema.Types.ObjectId, ref: 'course' }],
    courseCreated: [{ type: schema.Types.ObjectId, ref: 'course' }],
    joinedOn: { type: Date, default: Date.now }
});

userSchema.methods.createSalt = function () {
    return bcrypt.genSaltSync(10);
};

userSchema.methods.createHash = function (password, salt) {
    return bcrypt.hashSync(password, salt);
};

userSchema.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.destroyInviteToken = function (email) {
    inviteModel.findOneAndUpdate({ 'email': email }, { 'signedUpOn': Date.now() }, function (err, obj) {
        if (err) {
            console.log("Error Removing the associated token " + err);
        }
        console.log("successfully removed " + obj);
    });
};

var User = mongoose.model('user',userSchema);

User.find({ 'username': 'admin' }).exec(function (err, collection) {
    if (collection.length === 0) {
        var salt, hash;
        salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync('passwordocs', salt);
        User.create({email:'admin@ocs.com',username:'admin',salt: salt, password: hash, roles: ['admin']});
    }
});

exports.userModel = mongoose.model('user', userSchema);