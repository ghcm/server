
/*
 * GET login page.
 */

Department = require('models/department').Department;


exports.get = function(req, res, next){

    Department.find(function(err, result){
        if (result.length == 0) {
            var depart = new Department({name: "Common", rusname: "Common"});
            depart.save(function(err, depart, affected) {
                if (err) next(err);
                var arr = [];
                arr.push(depart);
                res.render('company/add_company', { title: 'Express', departs: arr });
            });
        }
        else {
            console.log(result);
            res.render('company/add_company', { title: 'Express', departs: result });
        }

    });
}




var path = require('path'),
    fs = require('fs'),
    Company = require('models/company').Company;

exports.post = function(req, res, next){

    var addObject = {}

    if (req.files.file.name) {
        var tempPath = req.files.file.path,
            targetPath = path.dirname(req.files.file.path)  + "/company/"  + path.basename(req.files.file.path);
console.log(targetPath);
console.log(path.dirname(req.files.file.path));
        addObject.image = path.basename(targetPath);
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
        });
    }
   /* else {
        addObject.image = "no-logo.jpg";
    }*/

    addObject.name = req.body.name;
    addObject.department = req.body.department;

    company = new Company(addObject);

    company.save(function(err, company, affected) {
        console.log(company);
        if (!err) {
            res.render('company/show_company', { title: 'Express', company: company  });
        }
        else {
            console.log(err);
            res.render('company/add_company', { title: 'Express', error: err.errors });
        }
    });


    // если просто user.save(callback), то будет лишний аргумент у следующей функции


    /**
     * этот код удаляет файл из временной папки
     */
    /*fs.unlink(tempPath, function () {
        if (err) throw err;
        console.error("Only .png files are allowed!");
    });*/


}