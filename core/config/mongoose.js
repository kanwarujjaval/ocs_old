var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    dbVars = require('./config').dbConnection[env];

var createDbConnection = function () {
    mongoose.connect(dbVars.uri);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongo DB connection error...'));
    db.once('open', function callback() {
        console.log("Connection to MongoDB database established at " + dbVars.uri);
    });
}

exports.connectDb = function () {
    createDbConnection();
}