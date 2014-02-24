var path = require('path');

exports.watchVideo = function (req, res, next) {
	res.render('video', {
            src: " /testVid.mp4",
            courseId: req.params.id,
            userId: req.session.passport.user
        });
}