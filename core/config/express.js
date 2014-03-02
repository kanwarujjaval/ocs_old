var express = require('express'),
    passport = require('passport');

require('./config').setPath();

function requireHTTPS(req, res, next) {
    if (!req.secure) {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

module.exports = function (app) {

    app.configure('development', function () {
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
        app.use(express.logger({ immediate: true, format: 'dev' }));    //non caching of assets and dev logger for development
        app.disable('x-powered-by');
        app.enable('trust proxy');
        app.use(express.cookieParser('SomeRandomSecretPasswordForCookieParsing_for*Project Yellow'));
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());
        app.use(express.session({
            proxy: true,
            key: 'session_cookie',
            secret: 'SomeRandomSecretPasswordForCookieParsing_for*Project Yellow',
            cookie: {
                httpOnly: true,
                //secure: true,
                maxAge: 604800000
            }
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(express.compress());
        app.engine('html', require('ejs').renderFile);
        app.set('views', viewPath);
        app.set('view engine', 'html');
        app.use(express.static(publicPath));
        app.use(app.router);
        app.use(function (req, res) {
            res.send(404, { msg: 'Page not found!' });
        });
        app.use(function (error, req, res, next) {
            res.send(500, error);
        });
    });

    app.configure('production', function () {
        app.use(express.logger());
        app.use(requireHTTPS);
        app.enable('trust proxy');
        app.disable('x-powered-by');
        app.use(express.cookieParser('SomeRandomSecretPasswordForCookieParsing_for*Project Yellow'));
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());
        app.use(express.session({
            proxy: true,
            key: 'session_cookie',
            secret: 'SomeRandomSecretPasswordForCookieParsing_for*Project Yellow',
            cookie: {
                httpOnly: true,
                secure: true,
                maxAge: 604800000
            }
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(express.compress());
        app.engine('html', require('ejs').renderFile);
        app.set('views', viewPath);
        app.set('view engine', 'html');
        app.use(express.static(publicPath));
        app.use(app.router);
        app.use(function (req, res) {
            res.status(404);
            res.render('index', { title: "404 Error !! Page not Found" });
        });
        app.use(function (error, req, res, next) {
            res.status(500);
            res.render('index', { title: error });
        });
    });
}


