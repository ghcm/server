
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

    var replaceObject = {}

    replaceObject.name = req.body.name;
    var objectId = req.body.objectId;

    if (!Company.schema.methods.validateObj(replaceObject)) {
        Company.findOne({ "_id": objectId}, function(err, result) {
            console.log(result);
            res.render('edit_company', { title: 'Express', error: "Please, check entered data", company: result });
        });

        return;
    }



    if (req.files.file.name) {
        var tempPath = req.files.file.path,
            targetPath = path.resolve(req.files.file.path);

        replaceObject.image = path.basename(targetPath);
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
        });
    }


    Company.update({"_id": objectId }, {$set: replaceObject }, function(err, object, affected) {
        if (!err) {
            Company.findOne({ "_id": objectId}, function(err, result) {
                    res.render('show_company', { title: 'Express', company: result  });
            })
        }
    });
   

};