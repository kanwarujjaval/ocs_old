module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            title: "Home Page"
        });
    });

    app.get('/invite', function (req, res) {
        res.render('invite', {
            title: "Request an Invite",
            action: "/invite"
        });
    });

    app.get('/login', function (req, res) {
        res.render('form', {
            title: "Login",
            action: "/login",
            fields: [
            { name: 'email', type: 'text', property: 'required' },
            { name: 'password', type: 'password', property: 'required' }
            ]
        });
    });
}