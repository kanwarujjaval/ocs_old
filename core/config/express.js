var express = require('express'),
    passport = require('passport'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    compression = require('compression'),
    methodover = require('method-override'),
    session = require('express-session'),
    csurf = require('csurf'),
    bodyparser = require('body-parser'),
    errorhandler = require('errorhandler');


require('./config').setPath();      //Set paths, addresses and environment variables


/*
 * Redirect to HTTPS Secure Version of the page
 */

function requireHTTPS(req, res, next) {
    if (!req.secure) {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

/*
 * Count page views and session time for the current session
 */

function countSession(req, res, next) {
    var sess = req.session;
    if (sess.views) {
        sess.views++;
        console.log('***** views: ' + sess.views+ ' expires in: ' + (sess.cookie.maxAge / 1000) + 's ******');
    } else {
        sess.views = 1;
        console.log('***** welcome to the session demo. refresh! *****');
    }
    next();
}

/*
 * The actual configuration for express
 */

module.exports = function (app) {

    /*
    * 
    * Development Settings
    * 
    */

    if ('development' == env) {
        app.use(errorhandler({ dumpExceptions: true, showStack: true }));
        app.use(morgan('method=":method"  ":url" status=:status  time=":response-time ms"', immediate = true));
        app.disable('x-powered-by');
        app.enable('trust proxy');
        app.use(compression());
        app.use(cookieParser('SomeRandomSecretPasswordForCookieParsing_for*Project Yellow'));
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({
            extended: true
        }));
        app.use(methodover());
        app.use( session( {
            proxy: true,
            key: 'session_cookie',
            secret: 'SomeRandomSecretPasswordForCookieParsing_for*Project Yellow',
            saveUninitialized: true,
            resave: true,
            cookie: {
                httpOnly: true,
                maxAge: 604800000
            }
        }) );
        app.use(passport.initialize());
        app.use(passport.session());
        app.engine('html', require('ejs').renderFile);
        app.set('views', viewPath);
        app.set('view engine', 'html');
        app.use('/public',express.static(publicPath, { maxAge: 0 }));
        //app.use(countSession);          //To be used in development for testing sessions

    }


    /*
     * 
     * Production Settings
     * 
     */

    if ('production' == env) {
        //app.use(morgan());            //disable logging on production for faster speed *could be a bad idea - not sure*
        //app.use(requireHTTPS);        //disabled https till the certificate not present
        app.enable('trust proxy');
        app.disable('x-powered-by');
        app.use(compression());
        app.use(cookieParser('SomeRandomSecretPasswordForCookieParsing_for*Project Yellow'));
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({
            extended: true
        }));
        app.use(methodover());
        app.use(session({
            proxy: true,
            key: 'session_cookie',
            secret: 'SomeRandomSecretPasswordForCookieParsing_for*Project Yellow',
            saveUninitialized: true,
            resave: true,
            cookie: {
                httpOnly: true,
                secure: true,
                maxAge: 604800000
            }
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.engine('html', require('ejs').renderFile);
        app.set('views', viewPath);
        app.set('view engine', 'html');
        app.use('/public', express.static(publicPath, { maxAge: 604800000 }));
    }
};