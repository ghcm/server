
/*
 * GET login page.
 */
Company = require('models/company').Company;
Department = require('models/department').Department;
var async = require('async');

var config = require("config");

var filePath = config.get("fileOrganizer:company:path");
var filePathView = config.get("fileOrganizer:company:viewPath");


exports.get = function(req, res){

    Department.find(function(err, result) {
        if (err) { /* handle err */ }

        var departments = {};
        Department.find(function(err, result) {

            console.log(result);

            async.map(result,
                function (item, callback) {
                    Company.find({department: item._id}, function(err, result) {
                        // console.log(result);

                        departments[item.name] = result;

                    }).exec(callback);

                    // res.json(item.getPublicFields());
                },

                function(err, results){
                    console.log(departments);
                    res.render('company/all_companies', { title: 'Express', companies: departments, filePathView: filePathView });

                });


        });

        /*if (result) {
            res.render('company/all_companies', { title: 'Express', companies: result });
        } else {
            // we don't
        }*/
    });

};

