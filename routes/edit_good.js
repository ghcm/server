
/*
 * GET login page.
 */
Good = require('models/good').Good;

exports.get = function(req, res){

    var goodName = req.params.goodName;

    var myDocument = Good.findOne({ name: goodName }, function(err, result) {
        if (err) { /* handle err */ }

        if (result) {
            res.render('edit_good', { title: 'Express', good: result  });
        } else {
            // we don't
        }
    });

};


var path = require('path'),
    fs = require('fs');

exports.post = function(req, res, next){

    var replaceObject = {};

    replaceObject.name = req.body.name;
    var objectId = req.body.objectId;

    if (!Good.schema.methods.validateObj(replaceObject)) {
        Good.findOne({ "_id": objectId}, function(err, result) {
            res.render('edit_good', { title: 'Express', error: "Please, check entered data" , good: result});

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


    Good.update({"_id": objectId }, {$set: replaceObject }, function(err, object, affected) {
        if (!err) {
            Good.findOne({ "_id": objectId}, function(err, result) {
                    res.render('edit_good', { title: 'Express', good: result  });
            })
        }
    });
   

};