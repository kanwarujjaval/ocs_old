var formidable = require('formidable');
var path = require('path');
var fs = require('fs-extra');
var courseContentModel = require('../models/courseContent').courseContentModel;
var courseModel = require('../models/course').courseModel;

var form = new formidable.IncomingForm();


exports.uploadHandler = function (req, res, next) {
    var uploadPath = path.join(path.normalize(__dirname + '/../../data/uploads'), req.session.passport.user, 'videos'); // 'videos' to be replaced by the current course name coming from the path
    fs.mkdirs(uploadPath, function (err) {
        if (err) {
            console.error(err);
        }
        form.uploadDir = uploadPath;
        form.keepExtensions = true;
        form.parse(req, function (err, fields, files) {
            res.send(files);
        });
        form.on('progress', function (bytesReceived, bytesExpected) {
            var percent = (bytesReceived / bytesExpected * 100) | 0;
            console.log('Uploading: %' + percent + '\r');
        })

    });
}

exports.editCourse = function(){}

// to add youtube url to the path in db
exports.addYoutubeVideo = function (req, res, next) {
    courseModel.findOne({'_creator':req.session.passport.user}, function (err, course) {
        res.send(course)
    });
}