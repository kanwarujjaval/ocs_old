var courseModel = require('../models/course').courseModel;
var userModel = require('../models/user').userModel;


/*
    /user/:username
*/

exports.getPublicProfile = function (req, res, next) {
    res.send("User's Public Profile");
};

/*
    /user/:username/courses
*/

exports.getUserCourses = function (req, res, next) {
    res.send("USer's Courses");
};


/*
    /user/:username/notes
*/

exports.getPublicNotes = function (req, res, next) {
    res.send("User's Notes");
};


/*
    /user/:username/lectures
*/

exports.getLectures = function (req, res, next) {
    res.send("User's Lectures");
};


/*
    /user/:username/achievements
*/

exports.getPublicAchievements = function (req, res, next) {
    res.send("User's Achievements");
};