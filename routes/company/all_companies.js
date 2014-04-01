
/*
 * GET login page.
 */
Company = require('../../models/company').Company;
Department = require('../../models/department').Department;
var async = require('async');

var config = require("../../config");

var filePath = config.get("fileOrganizer:company:path");
var filePathView = config.get("fileOrganizer:company:viewPath");


exports.get = function(req, res){

   // Department.find(function(err, result) {
      //  if (err) { /* handle err */ }

        var departments = {};
        Department.find(function(err, result) {
          //  console.log(result);
            async.mapSeries(result,
                function (item, callback) {
                    Company.find({department: item._id}, function(err, result2) {
//                        console.log(result2);

                        //departments[item.name] = result2;

                    }).exec(function(err, res) {   departments[item.name] = res;  callback()});

                    // res.json(item.getPublicFields());
                },

                function(err, results){
                    if (err) next(err);
                    // console.log(results);
                    // console.log(departments);
                    res.render('company/all_companies', { title: 'Express', companies: departments, filePathView: filePathView });

                });


        });

        /*if (result) {
            res.render('company/all_companies', { title: 'Express', companies: result });
        } else {
            // we don't
        }*/
   // });

};

