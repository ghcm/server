var Cat = require('../models/cat').Cat;
var Company = require('../models/company').Company;
var Department = require('../models/department').Department;

var async = require("async");

module.exports = function(req, res, next) {

    async.parallel([
        function(callback) {
            Department.find().count().exec(callback);
        },
        function(callback) {
            Company.find().count().exec(callback);
        },
        function(callback) {
            Cat.find().count().exec(callback);
        }
    ], function(err, results) {
        req.departsCount = res.locals.departsCount = results[0];
        req.companiesCount = res.locals.companiesCount = results[1];
        req.catsCount = res.locals.catsCount = results[2];
        next();
    });



};