module.exports = function (app) {

    
    app.get('/partials/*', function (req, res) {
        res.render('../views/' + req.params);
    });

    app.get('*', function (req, res) {
        res.render('index');
    });

}