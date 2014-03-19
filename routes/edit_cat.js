
/*
 * GET login page.
 */
Cat = require('models/cat').Cat;

exports.get = function(req, res){

    var catName = req.params.catName;

    var myDocument = Cat.findOne({ name: catName }, function(err, result) {
        if (err) { /* handle err */ }

        if (result) {

            res.render('edit_cat', { title: 'Express', cat: result  });
        } else {
            // we don't
        }
    });

};




exports.post = function(req, res, next){

    var replaceObject = {}, objectId;

    replaceObject.name = req.body.cat_title;
      objectId = req.body.objectId;
    var objectId = req.body.objectId;



    Cat.update({"_id": objectId }, {$set: replaceObject }, function(err, object, affected) {
        if (!err) {
            Cat.findOne({ "_id": objectId}, function(err, result) {
                    res.render('edit_cat', { title: 'Express', cat: result, message: "Категория успешно отредактирована"  });
            })
        }
    });
   

};