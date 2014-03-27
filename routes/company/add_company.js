
/*
 * GET login page.
 */

var Department = require('../../models/department').Department,
 config = require("../../config");

var filePath = config.get("fileOrganizer:company:path");
var filePathView = config.get("fileOrganizer:company:viewPath");


exports.get = function(req, res, next){

    Department.find(function(err, result){
        if (result.length == 0) {
            var depart = new Department({name: "Common", rusname: "Common"});
            depart.save(function(err, depart, affected) {
                if (err) next(err);
                var arr = [];
                arr.push(depart);
                res.render(filePath + '/add_company', { title: 'Express', departs: arr });
            });
        }
        else {
            console.log(result);
            res.render(filePath + '/add_company', { title: 'Express', departs: result });
        }

    });
}


var path = require('path'),
    fs = require('fs'),
    Company = require('../../models/company').Company;

exports.post = function(req, res, next){

    var addObject = {}

    if (req.files.file.name) {
        var tempPath = req.files.file.path,
            targetPath = path.dirname(req.files.file.path)  + "/" + filePath + "/"  + path.basename(req.files.file.path);

        addObject.image = path.basename(targetPath);
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
        });
    }

    addObject.name = req.body.name;
    addObject.department = req.body.department;

    company = new Company(addObject);

    company.save(function(err, company, affected) {
        console.log(company);
        if (!err) {
            res.render( filePath + '/show_company', { title: 'Express', filePathView: filePathView, company: company  });
        }
        else {
            console.log(err);
            res.render( filePath + '/add_company', { title: 'Express', filePathView: filePathView,  error: err.errors });
        }
    });
}