exports.get = function(req, res) {
   // if (!req.session.user) res.redirect('/login');
    res.render('f/index', {title: "express"});
};