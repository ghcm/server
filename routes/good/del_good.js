
/*
 * GET login page.
 */
var Good = require('../../models/good').Good,
    config = require("../../config");

var filePath = config.get("fileOrganizer:good:path");
var filePathView = config.get("fileOrganizer:good:viewPath");


exports.post = function(req, res, next){
    var goodId = req.body.goodId;
    console.log(goodId);
    var removeres = Good.remove({ _id: goodId }, function(err, result) {
        if (err) next(err);
        console.log(result);
        if (result) {
            res.json({result: "success", text: "SUCCESS"});
        } else {
            res.json({result: "error", text: "FAIL"});
        }
    });

};

