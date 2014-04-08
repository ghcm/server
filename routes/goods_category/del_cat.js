
/*
 * GET login page.
 */

var Cat = require('../../models/cat').Cat;
var Good = require('../../models/good').Good;
var async = require("async");


exports.post = function(req, res, next){

console.log(req.body.catId);

    async.series([function(callback) {
            Good.remove({"belongs.catId": req.body.catId}).exec(callback)
    },
    function(callback) {
        Cat.remove({_id: req.body.catId}).exec(callback);
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