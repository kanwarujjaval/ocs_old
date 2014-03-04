﻿/*
 * This file defines the function for the course api
 * all paths for the functions are relative to the function name
 * begins with /api/course
 * 
 * all the queries require the user to be logged in (auth/auth/ isLoggedIn )
 * some require the user making the api call to be the course owner/creator (auth/auth/ auth.isCourseCreator)
 *
 */

var courseModel = require('../models/course').courseModel;
var userModel = require('../models/user').userModel;
var errHandler = require('../service/errorHandler.js');


/*
/api/course/all 

requires login
*/

exports.getCourseAll = function (req, res, next) {
    courseModel.find({}, { '_id': 1, 'name': 1, 'createdOn': 1, 'updatedOn': 1, 'tags': 1, 'category': 1, 'rating': 1, 'description': 1 }, function (err, course) {
        if (err) {
            res.send(errHandler.err(err));
        }
        if (!course) {
            res.send(errHandler('Requested Resource Not Found'));
        }
        else {
            res.send(course);
        }
    });
}


/*
/api/course/:id

requires login
*/

exports.getCourseById = function (req, res, next) {
    courseModel.findOne({ '_id': req.params.id })/*.populate('_creator')*/.exec(function (err, course) {
        if (err) {
            res.send('DataBase error');
        }
        if (!course) {
            res.send("Course not found");
        }
        else {
            res.render('video', {
                title: "Watch Video",
                src: course.contentPath,
                userId: course._creator,
                courseId: course._id
            });
        }

    });
}

exports.createCoursePost = function (req, res, next) {
    var newCourse = new courseModel();
    newCourse._creator = req.session.passport.user;
    newCourse.name = req.body.title;
    newCourse.save(function (err) {
        if (err) {
            res.send(err);
        }
        courseModel.populate(newCourse, "_creator", function (err, course) {
            userModel.findOne({ 'email': newCourse._creator.email }, function (err, user) {
                user.courseCreated.push(newCourse);
                user.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    var redPath = "/course/" + newCourse._id + "/edit";
                    res.redirect(redPath);
                });
            });
        });
    });
    //res.send(newCourse);
}

/*
/course/:id/delete
*/

exports.deleteCourse = function (req, res, next) {
    console.log("req.params.id " + req.params.id);
    console.log("req.session.passport.user " + req.session.passport.user);
    courseModel.findOneAndRemove({ $and: [{ '_id': req.params.id }, { '_creator': req.session.passport.user }] }, function (err, course) {
        if (err) {
            res.send(err);
        }
        console.log("course " + course + " has been deleted");
        userModel.findOne({ '_id': req.session.passport.user }, function (err, user) {
            var index = user.courseCreated.indexOf(req.params.id);
            user.courseCreated.splice(index, 1);
            user.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Unlinked course from user profile");
                }
            });
        });
    });
}

/*
/course/:id/edit
*/

exports.editCourse = function (req, res, next) {
    var path = "/course/" + req.params.id + "/edit";
    res.render('form', {
        title: "Edit Course",
        action: path,
        fields: [
            { name: 'playlist', type: 'text', property: 'required' }
        ]
    });
}

exports.editCoursePost = function (req, res, next) {
    courseModel.findById(req.params.id, function (err, course) {
        course.contentPath = req.body.playlist;
        course.updatedOn = Date.now();
        course.save(function (err, courseUpdated, number) {
            if (err) {
                res.send(500, { msg: 'server Error' });
            }
            else if (number > 0) {
                res.send(courseUpdated);
            }
            else {
                res.send({
                    msg: "successfully updated the course",
                    data: courseUpdated
                })
            }
        });
    });
}

/*
/course/:id/test
*/

exports.getCourseTest = function (req, res, next) {
    res.send("You are only eligible for the test after completin the course");
}

/*
/course/:id/leaderboard
*/

exports.getCourseLeaderboard = function (req, res, next) {
    res.send("Top 10 Scorers for this course");
}

/*
/course/:id/files
*/

exports.viewCourseFiles = function (req, res, next) {
    res.send("Course Files");
}

/*
/course/:id/discuss
*/

exports.discussCourse = function (req, res, next) {
    res.send("Discussion for course Name");
}

/*
/course/:id/play/:module
*/

exports.playCourse = function (req, res, next) {
    res.send("Now playing module");
}

