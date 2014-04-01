Department = require('../models/department').Department;

exports.get = function(app) {

    return function(req, res) {

        Department.find(function(err, result) {
            console.log("result" + result);
            res.render('f/index', {title: "express", environment: app.get("env"), departments: result});
        });

    }
   // if (!req.session.user) res.redirect('/login');
    //res.render('f/index', {title: "express", environment: app.get("env")});
};