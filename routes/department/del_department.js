
/*
 * GET login page.
 */

var Cat = require('../../models/cat').Cat;
var Good = require('../../models/good').Good;
var Company = require('../../models/company').Company;
var Department = require('../../models/department').Department;
var async = require("async");


exports.post = function(req, res, next){

console.log(req.body.departId);

    async.series([
    function(callback) {
        Good.remove({"belongs.departId": req.body.departId}).exec(callback);
        callback();
    },
    function(callback) {
        Company.find({department: req.body.departId}).exec(function(err, companies) {
               for (var i = 0; i < companies.length; i++) {
                   Cat.remove({"companyId": companies[i]._id.toString()}, function(err, affected){console.log(affected);});
               }
        });
        Company.remove({department: req.body.departId}).exec(callback);

    },
     function(callback) {
        Department.remove({_id: req.body.departId}).exec(callback);
    }
        ],
    function(err, results) {
        if (err) next(err);
        if (results) {
            res.json({result: "success", text: "SUCCESS"});
        } else {
            res.json({result: "error", text: "FAIL"});
        }
    })





}