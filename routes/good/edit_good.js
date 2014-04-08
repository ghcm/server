
/*
 * GET login page.
 */
var Cat = require('../../models/cat').Cat;
var Department = require('../../models/department').Department;
var Company = require('../../models/company').Company;

var async = require("async");
var config = require("../../config");

var filePath = config.get("fileOrganizer:good:path");
var filePathView = config.get("fileOrganizer:good:viewPath");



exports.get = function(req, res){

    var goodId = req.params.goodName;

    async.parallel([
            function(callback){
                Good.findOne({ _id: goodId }, function(err, result) {
                    if (err) { /* handle err */ }

                    if (result) {
                       callback(null, result);
                    } else {
                        // we don't
                    }
                });
            },
            function(callback){
                Cat.find(function(err, result) {
                    if (err) next(err);
                    callback(null, result);
                });
            },
            function(callback){
                Company.find(function(err, result) {
                    if (err) next(err);
                    callback(null, result);
                });
            } ,
            function(callback){
                Department.find(function(err, result) {
                    if (err) next(err);
                    callback(null, result);
                });
            }
        ],
// optional callback
        function(err, results){
            console.log(results[0]);
            // the results array will equal ['one','two'] even though
            // the second function had a shorter timeout.

            res.render('good/edit_good', { title: 'Express', cats: results[1], companies: results[2], departs: results[3],  good: results[0], filePathView: filePathView  });
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