
/*
 * GET login page.
 */
Company = require('../../models/company').Company,
    config = require("../../config");
var async = require("async");
var Department = require('../../models/department').Department;

var filePath = config.get("fileOrganizer:company:path");
var filePathView = config.get("fileOrganizer:company:viewPath");


exports.get = function(req, res){

    var companyId = req.params.companyName;


    async.parallel([
            function(callback){
                Department.find({}).exec(callback);
            },
            function(callback){
                Company.findOne({ "_id": companyId }).exec(callback);
            }
        ],
// optional callback
        function(err, results){

            // the results array will equal ['one','two'] even though
            // the second function had a shorter timeout.

            res.render(filePath + '/edit_company', { title: 'Express', company: results[1], departs: results[0], filePathView: filePathView  });
        });

    /*var myDocument = Company.findOne({ name: companyName }, function(err, result) {
        if (err) { *//* handle err *//* }

        if (result) {
            res.render(filePath + '/edit_company', { title: 'Express', company: result, filePathView: filePathView  });
        } else {
            // we don't
        }
    });*/

};


var path = require('path'),
    fs = require('fs');

exports.post = function(req, res, next){

    var replaceObject = {}

    replaceObject.name = req.body.name;
    replaceObject.department = req.body.departId;
    replaceObject.snippet = req.body.snippet;
   // replaceObject.name_rus = req.body.name_rus ? req.body.name_rus : "";
   // replaceObject.description = req.body.description ? req.body.description : "";
    var objectId = req.body.objectId;

    console.log(replaceObject);

    if (!Company.schema.methods.validateObj(replaceObject)) {
        Company.findOne({ "_id": objectId}, function(err, result) {
            if (err) next(err);


            async.parallel([
                    function(callback){
                        Department.find({}).exec(callback);
                    },
                    function(callback){
                        Company.findOne({ "_id": objectId }).exec(callback);
                    }
                ],
// optional callback
                function(err, results){

                    // the results array will equal ['one','two'] even though
                    // the second function had a shorter timeout.
                    res.render(filePath + '/edit_company', { title: 'Express', error: "Please, check entered data",  company: results[1], departs: results[0], filePathView: filePathView  });

                });


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


    Company.update({"_id": objectId }, {$set: replaceObject }, function(err, object, affected) {
        if (err) next(err);
        if (!err) {


            async.parallel([
                    function(callback){
                        Department.find({}).exec(callback);
                    },
                    function(callback){
                        Company.findOne({ _id: objectId }).exec(callback);
                    }
                ],
// optional callback
                function(err, results){

                    // the results array will equal ['one','two'] even though
                    // the second function had a shorter timeout.
                    res.render(filePath + '/show_company', { title: 'Express', company: results[1], departs: results[0], filePathView: filePathView   });
                });


            Company.findOne({ "_id": objectId}, function(err, result) {

            })
        }
    });
   

};