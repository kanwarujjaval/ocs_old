var auth = require('../auth/auth');
var up = require('../service/uploader');
var xcourse = require('../api/course');

module.exports = function (app) {

    app.post('/signup', auth.isInvited, auth.signupAuthenticate);

    app.post('/login', auth.loginAuthenticate);

    app.post('/upload', up.uploadHandler);

    app.post('/addVideo', auth.isLoggedIn ,up.addYoutubeVideo);

    app.post('/invite', auth.createInvite);

    app.post('/course/create', auth.isLoggedIn, xcourse.createCoursePost);

}