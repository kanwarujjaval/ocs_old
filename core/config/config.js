var path = require('path');

exports.setVars = function () {
    ipaddress = process.env.OPENSHIFT_NODEJS_IP;
    port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
    env = process.env.NODE_ENV || 'development';
    if (typeof ipaddress === "undefined") {
        ipaddress = "127.0.0.1";
    };
}

exports.setPath = function () {
    rootPath = path.normalize(__dirname + '/../../');
    viewPath = path.join(rootPath, "/views");
    publicPath = path.join(rootPath, "public");
}

exports.dbConnection = {
    development: {
        uri: "mongodb://localhost:27017/" + "yellow"
    },
    production: {
        uri: process.env.OPENSHIFT_MONGODB_DB_URL + "yellow"
    }
}