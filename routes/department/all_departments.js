
/*
 * GET login page.
 */
Department = require('../../models/department').Department;

exports.get = function(req, res){


    var myDocument = Department.find(function(err, result) {
        if (err) { /* handle err */ }

        if (result) {
            res.render('department/all_departments', { title: 'Express', departments: result });
        } else {
            // we don't
        }
    });

};

