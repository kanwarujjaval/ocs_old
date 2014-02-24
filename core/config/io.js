module.exports = function (server, env) {
    var io = require('socket.io').listen(server);

    io.configure(env, function () {
        io.enable('browser client etag');
        io.enable('browser client minification');
        io.enable('browser client gzip ');
        io.set('log level', 0);
        io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
    });

    io.configure(env, function () {
        io.enable('browser client minification');
        io.set('transports', ['websocket']);
    });
}