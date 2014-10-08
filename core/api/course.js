/*
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


/*
 * GET
 *  /api/course/all
 * 
 * requires login
 */

exports.getCourseAll = function (req, res, next) {
    courseModel.find({}, { 'content': 0 }, function (err, course) {
        if (err) {
            res.send(err);
        }
        if (!course) {
            res.send('Requested Resource Not Found');
        }
        else {
            res.send(course);
        }
    });
}


/*
 * GET
 *  /api/course/:id
 * 
 * requires login
 */

exports.getCourseById = function (req, res, next) {
    courseModel
        .findOne({ '_id': req.params.id }, { 'content': 0, '__v': 0 })
        .populate('_creator', { 'username': 1, 'courseCreated': 1, '_id': 0 })
        .exec(function (err, course) {
            if (err) {
                res.send(err);
            }
            if (!course) {
                res.send('Requested Resource Not Found');
            }
            else {
                res.send(course);
            }

        });
}

/*
 * POST 
 * 
 *  Creates course from the Post request
 * 
 *  requires authentication isLoggedIn
 *
 */

exports.createCoursePost = function (req, res, next) {
    var newCourse = new courseModel();
    newCourse._creator = req.session.passport.user;         //Course creator user. _id
    newCourse.name = req.body.name;                        //Course name
    newCourse.category = req.body.category;                //Course category   
    newCourse.description = req.body.description;           //Course Description
    newCourse.tags = req.body.tags;                          // tags for the course [[ARRAY in json object]]
    newCourse.save(function (err) {
        if (err) {
            res.send(err);
        }
        courseModel.populate(newCourse, "_creator", function (err, course) {
            userModel.findOne({ 'email': newCourse._creator.email }, function (err, user) {
                user.courseCreated.push(newCourse);         // push the course created to user's record
                user.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    res.send(newCourse);
                });
            });
        });
    });
}

exports.addCourseModule = function (req, res, next) {
    courseModel.findOne({ '_id': req.body.id }, function (err, course) {
        course.module.push(req.body.module);         // push module to course module array
        course.save(function (err,courseNew) {
            if (err) {
                res.send(err);
            }
            res.send(courseNew);
        });
    });
}


/*
 * DELETE
 * 
 * /api/course/:id
 * 
 * requires login and course owner
 * 
 */

exports.deleteCourse = function (req, res, next) {
    console.log("req.params.id " + req.params.id);
    console.log("req.session.passport.user " + req.session.passport.user);
    courseModel.findOneAndRemove({ $and: [{ '_id': req.params.id }, { '_creator': req.session.passport.user }] }, function (err, course) {
        if (err) {
            res.send(err);
        }
        userModel.findOne({ '_id': req.session.passport.user }, function (err, user) {
            var index = user.courseCreated.indexOf(req.params.id);
            user.courseCreated.splice(index, 1);
            user.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Course delete and removed from user profile");
                }
            });
        });
    });
}

/*
 * POST
 * 
 * /api/course/:id
 * 
 * requires LOGIN and Course ownership
 * 
 * EDIT Course
 */

exports.editCoursePost = function (req, res, next) {
    courseModel.findById(req.params.id, function (err, course) {

        /*
         * Add course update paramatesrs from req.body
         */

        course.contentPath = req.body.playlist;
        course.updatedOn = Date.now();
        course.save(function (err, courseUpdated) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(courseUpdated)
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

