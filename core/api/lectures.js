
/*
    /lectures
*/

exports.getLecturesAll = function (req, res, next) {
    res.send("Upcoming Lectures");
};

/*
    /lectures/:id
*/

exports.getLecture = function (req, res, next) {
    res.send("Lecture Details");
};


/*
    /lectures/:id/enroll
*/

exports.enrollLecture = function (req, res, next) {
    res.send("Enroll for this lecture");
};


/*
    /lectures/:id/attend
*/

exports.enterLecture = function (req, res, next) {
    res.send("Enter this lecture now");
};


/*
    /lectures/:id/unenroll
*/

exports.unEnrollLectures = function (req, res, next) {
    res.send("unenroll from this lecture");
};