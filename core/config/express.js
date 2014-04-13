var express = require('express'),
    passport = require('passport'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    compression = require('compression'),
    methodover = require('method-override'),
    session = require('express-session'),
    csurf = require('csurf'),
    bodyparser = require('body-parser'),
    errorhandler = require('errorhandler');


require('./config').setPath();

function requireHTTPS(req, res, next) {
    if (!req.secure) {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

module.exports = function(app) {
    if ('development' == env) {
        app.use(errorhandler({ dumpExceptions: true, showStack: true }));
        app.use(logger({ immediate: true, format: 'dev' }));
        app.disable('x-powered-by');
        app.enable('trust proxy');
        app.use(cookieParser('SomeRandomSecretPasswordForCookieParsing_for*Project Yellow'));
        app.use(bodyparser());
        app.use(methodover());
        app.use( session( {
            proxy: true,
            key: 'session_cookie',
            secret: 'SomeRandomSecretPasswordForCookieParsing_for*Project Yellow',
            cookie: {
                httpOnly: true,
                maxAge: 604800000
            }
        }) );
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(compression());
        app.engine('html', require('ejs').renderFile);
        app.set('views', viewPath);
        app.set('view engine', 'html');
        app.use(express.static(publicPath));
    };

    if ('production' == env) {
        app.use(logger());
        app.use(requireHTTPS);
        app.enable('trust proxy');
        app.disable('x-powered-by');
        app.use(cookieParser('SomeRandomSecretPasswordForCookieParsing_for*Project Yellow'));
        app.use(bodyparser());
        app.use(methodover());
        app.use(session({
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
        app.use(compression());
        app.engine('html', require('ejs').renderFile);
        app.set('views', viewPath);
        app.set('view engine', 'html');
        app.use(express.static(publicPath));
    };
}