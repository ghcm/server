
var url = require('url');
var fs = require("fs");
var Department = require('../../models/department').Department;

exports.get = function(req, res, next){

    var url_parts = url.parse(req.url, true);

    var departParams = {};


    if (typeof url_parts.query.depart != "undefined") {
        departParams = { name: url_parts.query.depart }
    }

    Department.findOne(departParams).exec(function(err, result2) {
        Company.find({department: result2}, function(err, resultcomapnies) {
            res.json({"listitems": resultcomapnies, "depart": result2});

           // res.render('f/index', {title: "express", departments: result2, companies: resultcomapnies});
            //res.json(result);
        });
    });

/*    Department.findOne({name: url_parts.query.depart}, function(err, data) {

        if (err) next(err);
        if (!data) {
            console.log("aa");
            Department.findOne({}).exec(function(err, depart){console.log(depart);res.json(depart);});
        } else {
            console.log("bb");
            res.json(data);
        }

    });*/

};


