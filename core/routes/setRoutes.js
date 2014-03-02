module.exports = function (app) {

    require('./postRoutes.js')(app);
    require('./protectedRoutes.js')(app);
    require('./publicRoutes.js')(app);
}