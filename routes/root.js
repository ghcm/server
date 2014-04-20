Department = require('../models/department').Department;

var config = require("../config");

exports.get = function(app) {



    return function(req, res) {

        Department.find(function(err, result) {
            res.render('f/index', {title: "express", environment: app.get("env"), departments: result, logo: {name: config.get("logo:name")}});
        });

    }
   // if (!req.session.user) res.redirect('/login');
    //res.render('f/index', {title: "express", environment: app.get("env")});
};