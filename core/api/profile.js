var userModel = require('../models/user.js').userModel;
var courseModel = require('../models/course.js').courseModel;

/*
    /profile
*/
exports.getUser = function (req, res, next) {
    userModel.findOne({ '_id': req.session.passport.user }, function (err, user) {
        res.send({
            id: user._id,
            username: user.username,
            email: user.email,
            about: user.about,
            achieved: user.achieved,
            firstName: user.firstName,
            lastName: user.lastName,
            coursesCreated: user.courseCreated,
            courseViewed: user.courseViewed
        });
    })
}

/*
    /profile/courses/created
*/

exports.getUserCourses = function (req, res, next) {
    userModel.findOne({ '_id': req.session.passport.user }).populate('courseCreated').exec(function (err, user) {
        res.send(user.courseCreated);
    });
}

/*
    /profile/courses/taken
*/

exports.getUserCoursesTaken = function (req, res, next) {
    userModel.findOne({ '_id': req.session.passport.user }).populate('courseViewed').exec(function (err, user) {
        res.send(user.courseViewed);
    });
}

/*
    /profile/edit
*/

exports.profileEdit = function (req, res, next) {
    res.send("Edit your Profile");
}

/*
    /profile/settings
*/

exports.changeSettings = function (req, res, next) {
    res.send("Change your Settings");
}

/*
    /profile/lectures
*/

exports.getLectures = function (req, res, next) {
    res.send("Your Lectures");
}

/*
    /profile/achievements
*/

exports.getAchievements = function (req, res, next) {
    res.send("Your achievements");
}
