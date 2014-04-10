
var url = require('url');
var fs = require("fs");
var Department = require('../../models/department').Department;

exports.get = function(req, res, next){

    var url_parts = url.parse(req.url, true);

    Department.findOne({name: url_parts.query.depart}, function(err, data) {

        if (err) next(err);
        if (!data) {
            console.log("aa");
            Department.findOne({}).exec(function(err, depart){console.log(depart);res.json(depart);});
        } else {
            console.log("bb");
            res.json(data);
        }

    });

};


