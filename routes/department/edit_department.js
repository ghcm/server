
/*
 * GET login page.
 */
Department = require('../../models/department').Department;

exports.get = function(req, res){

    var departId = req.params.departName;

    var myDocument = Department.findOne({ "_id": departId }, function(err, result) {
        if (err) { /* handle err */ }

        if (result) {

            res.render('department/edit_department', { title: 'Express', department: result  });
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
                    res.render('department/edit_department', { title: 'Express', department: result, message: "Раздел успешно отредактирован"  });
            })
        }
    });
   

};