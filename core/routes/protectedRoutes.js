var auth = require('../auth/auth');
var xCourse = require('../api/course');
var vid = require('../service/videoLoader');
var profile = require('../api/profile');
var user = require('../api/user');
var lect = require('../api/lectures');

module.exports = function (app) {

    /*
    Profile Routes
    */

    app.get('/api/profile', auth.isLoggedIn, profile.getUser);
    app.get('/api/profile/courses/created', auth.isLoggedIn, profile.getUserCourses);
    app.get('/api/profile/courses/taken', auth.isLoggedIn, profile.getUserCoursesTaken);
    app.get('/api/profile/edit', auth.isLoggedIn, profile.profileEdit);
    app.get('/api/profile/settings', auth.isLoggedIn, profile.changeSettings);
    app.get('/api/profile/lectures', auth.isLoggedIn, profile.getLectures);
    app.get('/api/profile/achievements', auth.isLoggedIn, profile.getAchievements);

    /*
    Course routes
    */

    app.get('/api/course/create', auth.isLoggedIn, xCourse.createCourse);
    app.get('/api/course/:id', auth.isLoggedIn, xCourse.getCourse);
    app.get('/api/course/:id/edit', auth.isLoggedIn, auth.isCourseCreator, xCourse.editCourse);
    app.get('/api/course/:id/test', auth.isLoggedIn, xCourse.getCourseTest);
    app.get('/api/course/:id/leaderboard', auth.isLoggedIn, xCourse.getCourseLeaderboard);
    app.get('/api/course/:id/files', auth.isLoggedIn, xCourse.viewCourseFiles);
    app.get('/api/course/:id/discuss', auth.isLoggedIn, xCourse.discussCourse);
    app.get('/api/course/:id/play/:module', auth.isLoggedIn, xCourse.playCourse);
    app.get('/api/course/:id/delete', auth.isLoggedIn, auth.isCourseCreator, xCourse.deleteCourse);

    /*
    User Routes
    */

    app.get('/api/user/:username', auth.isLoggedIn, user.getPublicProfile);
    app.get('/api/user/:username/courses', auth.isLoggedIn, user.getUserCourses);
    app.get('/api/user/:username/notes', auth.isLoggedIn, user.getPublicNotes);
    app.get('/api/user/:username/lectures', auth.isLoggedIn, user.getLectures);
    app.get('/api/user/:username/achievements', auth.isLoggedIn, user.getPublicAchievements);

    /*
    Lecture Routes
    */

    app.get('/api/lectures', auth.isLoggedIn, lect.getLecturesAll);
    app.get('/api/lectures/:id', auth.isLoggedIn, lect.getLecture);
    app.get('/api/lectures/:id/enroll', auth.isLoggedIn, lect.enrollLecture);
    app.get('/api/lectures/:id/attend', auth.isLoggedIn, /*auth.isEnrolled,*/lect.enterLecture);
    app.get('/api/lectures/:id/unenroll', auth.isLoggedIn, /*auth.isEnrolled,*/lect.unEnrollLectures);

    /*
    Admin routes
    */

    app.get('/api/admin', function (req, res) { res.send("Admin Panel") });

    /*
    Authentication routes
    */

    app.get('/signup/:token', auth.verifyToken, function (req, res) {
        res.render('form', {
            title: "signup",
            action: "/signup",
            fields: [
            { name: 'email', type: 'text', property: 'required' },
            { name: 'password', type: 'password', property: 'required' },
            { name: 'username', type: 'text', property: 'required' }
            ]
        });
    });

    app.get('/logout', auth.isLoggedIn, function (req, res) {
        req.logout();
        res.redirect('/');
    });

    /*
    Temp Routes
    */
}