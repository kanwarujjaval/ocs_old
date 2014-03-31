module.exports = function () {
    var app = require('express')();
    var server = require('http').createServer(app);

    require('./config/config').setVars();
    require('./config/express')(app);
    require('./routes/setRoutes')(app);
    require('./config/io')(server, env);    //***DEV NOTE***socket.io performance fixes if 1.0 arrives,else move to sockjs with primus
    require('./config/mongoose').connectDb();
    require('./service/socketio.js')();

    server.listen(port, ipaddress, function () {
        console.log('%s: \nNode server started on %s:%d ...', Date(Date.now()), ipaddress, port);
    });
}