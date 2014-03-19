
/*
 * GET login page.
 */


exports.get = function(req, res){
    res.render('add_good', { title: 'Express' });
};


var path = require('path'),
    fs = require('fs'),
    Good = require('models/good').Good;

exports.post = function(req, res, next){

    var addObject = {}
console.log(req.files);
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

    addObject.name = req.body.title;

    good = new Good(addObject);

    good.save(function(err, good, affected) {
        if (!err) {
            res.render('show_good', { title: 'Express', good: good  });
        }
        else {
            console.log(err);
            res.render('add_good', { title: 'Express', error: err.errors });
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