

/*
 * GET login page.
 */
Cat = require('../../models/cat').Cat;
var Department = require('../../models/department').Department;
Company = require('../../models/company').Company;

var async = require("async");

exports.get = function(req, res, next){

    async.parallel([
        function(callback){
            Cat.find(function(err, result){

                if (result.length == 0) {
                    var cat = new Cat({name: "Common"});
                    cat.save(function(err, cat, affected) {
                        if (err) next(err);
                        var arr = [];
                        arr.push(cat);
                        callback(null, arr);
                        // res.render('good/add_good', { title: 'Express', cats: arr });
                    });
                }
                else {
                    callback(null, result);
                }
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

           res.render('good/add_good', { title: 'Express', cats: results[0], companies: results[1], departs: results[2] });
        });



};


var path = require('path'),
    fs = require('fs'),
    Good = require('../../models/good').Good;


var config = require("../../config");

var filePath = config.get("fileOrganizer:good:path");
var filePathView = config.get("fileOrganizer:good:viewPath");

exports.post = function(req, res, next){

    var addObject = {};

    if (req.files.file.name) {
        var tempPath = req.files.file.path,
            targetPath = path.dirname(req.files.file.path)  + "/" + filePath + "/"  + path.basename(req.files.file.path);

        addObject.image = path.basename(targetPath);
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
        });
    }
   /* else {
        addObject.image = "no-logo.jpg";
    }*/

    addObject.name = req.body.title;
    addObject.short_des = req.body.short_des;
    addObject.price = req.body.price;
    addObject.long_des = req.body.long_des;
    addObject.belongs = {};
    addObject.belongs.catId = req.body.catId;
    addObject.belongs.companyId = req.body.companyId;
    addObject.belongs.departId  = req.body.departId;
    console.log(addObject);

    good = new Good(addObject);

    good.save(function(err, good, affected) {
        if (!err) {
            res.render(filePath + '/show_good', { title: 'Express', good: good, filePathView: filePathView  });
        }
        else {
            console.log(err);
            res.render(filePath + '/add_good', { title: 'Express', error: err.errors });
        }
    });


    // если просто user.save(callback), то будет лишний аргумент у следующей функции


    /**
     * этот код удаляет файл из временной папки
     */
    /*fs.unlink(tempPath, function () {
        if (err) throw err;
        console.error("Only .png files are allowed!");
    });*/


}