
/*
 * GET login page.
 */
var config = require("config");

var filePath = config.get("fileOrganizer:company:path");
var filePathView = config.get("fileOrganizer:company:viewPath");


exports.get = function(req, res){
    var companyName = req.params.companyName;

    var myDocument = Company.findOne({ name: companyName }, function(err, result) {
        if (err) { /* handle err */ }

        if (result) {
            res.render( filePath + '/show_company', { title: 'Express', company: result, filePathView: filePathView });
        } else {
            // we don't
        }
    });

};

