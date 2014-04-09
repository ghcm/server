
/*
 * GET login page.
 */

var Cat = require('../../models/cat').Cat;
var Good = require('../../models/good').Good;
var Company = require('../../models/company').Company;
var async = require("async");


exports.post = function(req, res, next){

console.log(req.body.companyId);

    async.series([function(callback) {
        Good.remove({"belongs.companyId": req.body.companyId}).exec(callback)
    },
    function(callback) {
        Cat.remove({companyId: req.body.companyId}).exec(callback);
    },
    function(callback) {
        Company.remove({_id: req.body.companyId}).exec(callback);
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