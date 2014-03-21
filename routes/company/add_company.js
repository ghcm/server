
/*
 * GET login page.
 */

Department = require('models/department').Department;


exports.get = function(req, res){

    Department.find(function(err, result){
        if (result.length == 0) {
            var depart = new Department({name: "Common"});
            depart.save(function(err, depart, affected) {
                var arr = [];
                arr.push(cat);
                res.render('company/add_company', { title: 'Express', depart: arr });
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
            targetPath = path.resolve(req.files.file.path);

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