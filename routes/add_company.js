
/*
 * GET login page.
 */


exports.get = function(req, res){
    res.render('add_company', { title: 'Express' });
};


var path = require('path'),
    fs = require('fs');

exports.post = function(req, res, next){
    console.log(req.body.name);
    var tempPath = req.files.file.path,
        targetPath = path.resolve(req.files.file.path);
    if (path.extname(req.files.file.name).toLowerCase() === '.jpg') {
        fs.rename(tempPath, targetPath, function(err) {
            console.log(targetPath);
            if (err) throw err;
            console.log("Upload completed!");
            res.send(200, "its ok");

        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }
};