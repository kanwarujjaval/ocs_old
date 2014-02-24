module.exports = function (app) {

    require('./publicRoutes.js')(app);
    require('./postRoutes.js')(app);
    require('./protectedRoutes.js')(app);
}