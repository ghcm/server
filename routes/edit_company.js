
/*
 * GET login page.
 */
Company = require('models/company').Company;

exports.get = function(req, res){

    var companyName = req.params.companyName;

    var myDocument = Company.findOne({ name: companyName }, function(err, result) {
        if (err) { /* handle err */ }

        if (result) {

            res.render('edit_company', { title: 'Express', company: result  });
        } else {
            // we don't
        }
    });

};


var path = require('path'),
    fs = require('fs');

exports.post = function(req, res, next){
    var companyName = req.body.name;
    var objectId = req.body.objectId;

    Company.update({"_id": objectId}, {$set: {name: req.body.name} }, function(err, object) {

        Company.findOne({ "_id": objectId }, function(err, result) {
            res.render('edit_company', { title: 'Express', company: result  });
        })


    });
   

};