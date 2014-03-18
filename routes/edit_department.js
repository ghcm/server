
/*
 * GET login page.
 */
Department = require('models/company').Department;

exports.get = function(req, res){

    var departName = req.params.departName;

    var myDocument = Department.findOne({ name: departName }, function(err, result) {
        if (err) { /* handle err */ }

        if (result) {

            res.render('edit_department', { title: 'Express', department: result  });
        } else {
            // we don't
        }
    });

};




exports.post = function(req, res, next){

    var replaceObject = {}, objectId;

    replaceObject.name = req.body.department_title;
    replaceObject.rusname = req.body.department_title_rus;
    objectId = req.body.objectId;

    var objectId = req.body.objectId;

    Department.update({"_id": objectId }, {$set: replaceObject }, function(err, object, affected) {
        if (!err) {
            Department.findOne({ "_id": objectId}, function(err, result) {
                    res.render('edit_department', { title: 'Express', department: result, message: "Раздел успешно отредактирован"  });
            })
        }
    });
   

};