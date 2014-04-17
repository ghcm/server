var Company = require('../../models/company').Company;
var url = require('url');

exports.get = function(req, res){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    Company.find({department: query.depart.toString()}, function(err, result) {
        res.json(result);
    });

};
