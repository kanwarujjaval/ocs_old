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

    app.get('/profile', auth.isLoggedIn, profile.getUser);
    app.get('/profile/courses/created', auth.isLoggedIn, profile.getUserCourses);
    app.get('/profile/courses/taken', auth.isLoggedIn, profile.getUserCoursesTaken);
    app.get('/profile/edit', auth.isLoggedIn, profile.profileEdit);
    app.get('/profile/settings', auth.isLoggedIn, profile.changeSettings);
    app.get('/profile/lectures', auth.isLoggedIn, profile.getLectures);
    app.get('/profile/achievements', auth.isLoggedIn, profile.getAchievements);

    /*
    Course routes
    */

    app.get('/course/create', auth.isLoggedIn, xCourse.createCourse);
    app.get('/course/:id', auth.isLoggedIn, xCourse.getCourse);
    app.get('/course/:id/edit', auth.isLoggedIn, auth.isCourseCreator, xCourse.editCourse);
    app.get('/course/:id/test', auth.isLoggedIn, xCourse.getCourseTest);
    app.get('/course/:id/leaderboard', auth.isLoggedIn, xCourse.getCourseLeaderboard);
    app.get('/course/:id/files', auth.isLoggedIn, xCourse.viewCourseFiles);
    app.get('/course/:id/discuss', auth.isLoggedIn, xCourse.discussCourse);
    app.get('/course/:id/play/:module', auth.isLoggedIn, xCourse.playCourse);
    app.get('/course/:id/delete', auth.isLoggedIn, auth.isCourseCreator, xCourse.deleteCourse);

    /*
    User Routes
    */

    app.get('/user/:username', auth.isLoggedIn, user.getPublicProfile);
    app.get('/user/:username/courses', auth.isLoggedIn, user.getUserCourses);
    app.get('/user/:username/notes', auth.isLoggedIn, user.getPublicNotes);
    app.get('/user/:username/lectures', auth.isLoggedIn, user.getLectures);
    app.get('/user/:username/achievements', auth.isLoggedIn, user.getPublicAchievements);

    /*
    Lecture Routes
    */

    app.get('/lectures', auth.isLoggedIn, lect.getLecturesAll);
    app.get('/lectures/:id', auth.isLoggedIn, lect.getLecture);
    app.get('/lectures/:id/enroll', auth.isLoggedIn, lect.enrollLecture);
    app.get('/lectures/:id/attend', auth.isLoggedIn, /*auth.isEnrolled,*/lect.enterLecture);
    app.get('/lectures/:id/unenroll', auth.isLoggedIn, /*auth.isEnrolled,*/lect.unEnrollLectures);

    /*
    Admin routes
    */

    app.get('/admin', function (req, res) { res.send("Admin Panel") });

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

    app.get('/watch/:id', auth.isLoggedIn, vid.watchVideo);

    app.get('/add/Video', auth.isLoggedIn, function (req, res) {
        res.render('addVideo', {
            title: "Add you Video Playlist from Youtube"
        })
    });

    app.get('/upload', auth.isLoggedIn, function (req, res) {
        res.render('uploader', {
            title: "Upload",
            action: "/upload"
        });
    });

}