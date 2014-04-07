
var url = require('url');
var fs = require("fs");
var Department = require('../../models/department').Department;
var Company = require('../../models/company').Company;
var Good = require('../../models/good').Good;
var async = require("async");

exports.get = function(req, res, next){

    var url_parts = url.parse(req.url, true);

    var query = url_parts.query;

    var breadcumbs = {};

    console.log(query);

    async.parallel([
        function(callback) {
            if (query.depart)
                Department.find({_id: query.depart}).exec(function(err, data) { data[0] ? breadcumbs["depart"] = data[0].rusname: ""; callback(null, data) });
            else
                callback(null);
        },
        function(callback) {
            if (query.company)
                Company.find({_id: query.company}).exec(function(err, data) { data[0] ? breadcumbs["listItem"] = data[0].name: ""; callback(null, data) });
            else
                callback(null);
        },
        function(callback) {
            if (query.goodId)
                Good.find({_id: query.goodId}).exec(function(err, data) { data[0] ? breadcumbs["good"] = data[0].name: ""; callback(null, data) });
            else
                callback(null);
        }
        ],
        function(err, results){
            if (err) next(err);
            res.json(breadcumbs);
            console.log(breadcumbs);
        }
    );




};


