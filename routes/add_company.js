
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
    console.log(req.body);

    var tempPath = req.files.file.path,
        targetPath = path.resolve(req.files.file.path);

    console.log(path);
    console.log(targetPath);

    if (path.extname(req.files.file.name).toLowerCase() === '.jpg') {


        company = new Company({
            name: req.body.name,
            password: req.body.password,
            image: req.files.file.name
        });

        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
        });

        // если просто user.save(callback), то будет лишний аргумент у следующей функции
        company.save(function(err, company, affected) {

            res.render('edit_company', { title: 'Express', company: company  });
        });



    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }
};