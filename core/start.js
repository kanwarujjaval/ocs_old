module.exports = function () {
    var app = require('express')();
    var server = require('http').createServer(app);

    require('./config/config').setVars();
    require('./config/express')(app);
    require('./routes/setRoutes')(app);
    require('./config/io')(server, env);
    require('./config/mongoose').connectDb();
    require('./service/socketio.js')();

    server.listen(port, ipaddress, function () {
        console.log('%s: \nNode server started on %s:%d ...', Date(Date.now()), ipaddress, port);
    });
}