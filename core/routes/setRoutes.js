var auth = require('../auth/auth');
var xCourse = require('../api/course');
var profile = require('../api/profile');
var user = require('../api/user');
var invites = require('../api/invites');
var lect = require('../api/lectures');

module.exports = function (app) {

    /*
    Course routes
    */

    /* POST Request to create a new course */

    app.post('/api/course', auth.isLoggedIn, xCourse.createCoursePost);

    /* Get All courses from database */
    app.get('/api/course/all', auth.isLoggedIn, xCourse.getCourseAll);

    /* POST request to EDIT course by id */
    app.post('/api/course/:id', auth.isLoggedIn, auth.isCourseCreator, xCourse.editCoursePost);

    /* DELETE request to delete course by id */

    app.delete('/api/course/:id', auth.isLoggedIn, auth.isCourseCreator, xCourse.deleteCourse);

    /* Get a single course by ID */
    app.get('/api/course/:id', auth.isLoggedIn, xCourse.getCourseById);

    /* GET course test */
    app.get('/api/course/:id/test', auth.isLoggedIn, xCourse.getCourseTest);

    /* Get Course Files */
    app.get('/api/course/:id/files', auth.isLoggedIn, xCourse.viewCourseFiles);

    /* Get Course Discussion */
    app.get('/api/course/:id/discuss', auth.isLoggedIn, xCourse.discussCourse);

    /* Play ourse */
    app.get('/api/course/:id/play/:module', auth.isLoggedIn, xCourse.playCourse);

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
    app.get('/api/admin', function (req, res) { res.send("Admin Panel") }); /* NOT BEING USED>>> I GUESS*/

    app.get('/api/invites', auth.isLoggedIn, auth.isAdmin ,invites.getInvites); /* get invites from db JSON*/

    /*
    Authentication routes
    */

    app.post('/sendtoken', auth.sendToken); /*   SEND TOKEN EMAIL FROM ADMIN PANEL   */

    app.post('/signup/:token', auth.verifyToken, auth.isInvited, auth.signupAuthenticate); /*   Signup Form for token   */

    app.post('/login', auth.loginAuthenticate); /*   POST LOGIN DATA   */

    app.post('/invite', auth.createInvite);     /*  Post INVITE EMAIL   */

    app.get('/logout', auth.isLoggedIn, function(req, res) {        /* GET LOGOUT HAS TO CHANGED TO POST*/
        req.logout();
        res.redirect('/');
    });


    app.get('/test', function (req, res) {      /*  TEMP PATH TO BE REMOVED SOON    */
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        console.log(req);
        res.end("asd");
    });

    /*
    Static Routes
    */


    app.get('/partials/*', function (req, res) {
        res.render(viewPath + "/" + req.params[0]);
    });

    app.get('*', function (req, res) {
        res.render('index', {
            user:req.user
        });
    });
}