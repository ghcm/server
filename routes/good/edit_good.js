
/*
 * GET login page.
 */
Good = require('models/good').Good,
    config = require("config");

var filePath = config.get("fileOrganizer:good:path");
var filePathView = config.get("fileOrganizer:good:viewPath");



exports.get = function(req, res){

    var goodName = req.params.goodName;

    var myDocument = Good.findOne({ name: goodName }, function(err, result) {
        if (err) { /* handle err */ }

        if (result) {
            res.render(filePath + '/edit_good', { title: 'Express', good: result, filePathView: filePathView  });
        } else {
            // we don't
        }
    });

};


var path = require('path'),
    fs = require('fs');

exports.post = function(req, res, next){

    var replaceObject = {};

    replaceObject.name = req.body.name;
    var objectId = req.body.objectId;

    if (!Good.schema.methods.validateObj(replaceObject)) {
        Good.findOne({ "_id": objectId}, function(err, result) {
            res.render(filePath + '/edit_good', { title: 'Express', error: "Please, check entered data" , good: result});

        });
        return;
    }



    if (req.files.file.name) {
        var tempPath = req.files.file.path,
            targetPath = path.dirname(req.files.file.path)  + "/" + filePath + "/"  + path.basename(req.files.file.path);

        replaceObject.image = path.basename(targetPath);
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
        });
    }


    Good.update({"_id": objectId }, {$set: replaceObject }, function(err, object, affected) {
        if (!err) {
            Good.findOne({ "_id": objectId}, function(err, result) {
                    res.render(filePath + '/edit_good', { title: 'Express', good: result, filePathView: filePathView  });
            })
        }
    });
   

};