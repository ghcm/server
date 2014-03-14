
/*
 * GET login page.
 */


exports.get = function(req, res){
    res.render('add_company', { title: 'Express' });
};


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

    company = new Company(addObject);

    company.save(function(err, company, affected) {
        if (!err) {
            res.render('show_company', { title: 'Express', company: company  });
        }
        else {
            console.log(err);
            res.render('add_company', { title: 'Express', error: err.errors });
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