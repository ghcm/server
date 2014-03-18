
/*
 * GET login page.
 */


exports.get = function(req, res){
    res.render('add_department', { title: 'Express' });
};




var Department = require('models/department').Department;

exports.post = function(req, res, next){

    console.log(req.params);

    var depart = new Department({name: req.body.department_title, rusname: req.body.department_title_rus});


    depart.save(function(err, depart, affected) {
        if (!err) {
            res.render('add_department', { title: 'Express', company: depart, message: "Раздел успешно добавлен" });
        }
        else {
            console.log(err);
            res.render('add_department', { title: 'Express', error: err.errors });
        }
    });

}