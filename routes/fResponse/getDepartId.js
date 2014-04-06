
var url = require('url');
var fs = require("fs");
var Department = require('../../models/department').Department;

exports.get = function(req, res, next){

    var url_parts = url.parse(req.url, true);

    Department.find({name: url_parts.query.depart}, function(err, data) {

        if (err) next(err);
        res.json(data);
    });

};


