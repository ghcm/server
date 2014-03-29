exports.get = function(app) {

    return function(req, res) {
        res.render('f/index', {title: "express", environment: app.get("env")});
    }
   // if (!req.session.user) res.redirect('/login');
    //res.render('f/index', {title: "express", environment: app.get("env")});
};