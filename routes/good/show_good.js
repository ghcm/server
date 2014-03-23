
/*
 * GET login page.
 */
var Good = require('models/good').Good,
    config = require("config");

var filePath = config.get("fileOrganizer:good:path");
var filePathView = config.get("fileOrganizer:good:viewPath");


exports.get = function(req, res){
    var goodName = req.params.goodName;
    console.log(goodName);
    var myDocument = Good.findOne({ name: goodName }, function(err, result) {
        if (err) { /* handle err */ }
        console.log(result);
        if (result) {
            res.render(filePath + '/show_good', { title: 'Express', good: result, filePathView: filePathView });
        } else {
            // we don't
        }
    });

};

