var courseModel = require('../models/course').courseModel;
var userModel = require('../models/user').userModel;

/*
/course/create
*/

exports.createCourse = function (req, res, next) {
    res.render('form', {
        title: "Create Course",
        action: "/course/create",
        fields: [
            { name: 'title', type: 'text', property: 'required' }
            ]
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
                console.log(newCourse);
                user.save(function (err) {
                    console.log("yupiee")
                    if (err) {
                        res.send(err);
                    }
                });
            });
        });
    });
    res.send(newCourse);
    /*
    var redPath = "/course/" + newCourse._id + "/edit";
    res.redirect(redPath);*/
}

/*
/course/:id/delete
*/

exports.deleteCourse = function (req, res, next) {
    console.log("req.params.id " + req.params.id);
    console.log("req.session.passport.user " + req.session.passport.user);
    courseModel.findOneAndRemove({ $and: [{ '_id': req.params.id }, { '_creator': req.session.passport.user}] }, function (err, course) {
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
/course/:id
*/

exports.getCourse = function (req, res, next) {
    courseModel.findOne({ '_id': req.params.id }).populate('_creator').exec(function (err, course) {
        if (err) {
            res.send('DataBase error');
        }
        if (!course) {
            res.send("Course not found");
        }
        else {
            res.send(course);
        }

    });
}

/*
/course/:id/edit
*/

exports.editCourse = function (req, res, next) {
    courseModel.findOne({ '_id': req.params.id })/*.populate('_creator')*/.exec(function (err, course) {
        if (err) {
            res.send('DataBase error');
        }
        if (!course) {
            res.send("Course not found");
        }
        else {
            res.send(course);
        }

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

