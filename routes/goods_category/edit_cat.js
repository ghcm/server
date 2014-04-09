
/*
 * GET login page.
 */
Cat = require('../../models/cat').Cat;
var async = require("async");
Company = require('../../models/company').Company;

exports.get = function(req, res){

    var catName = req.params.catName;



    async.parallel([
            function(callback){
                Company.find({}).exec(callback);
            },
            function(callback){
                Cat.findOne({ name: catName }).exec(callback);
            }
        ],
// optional callback
        function(err, results){

            // the results array will equal ['one','two'] even though
            // the second function had a shorter timeout.

            res.render('goods_category/edit_cat', { title: 'Express', cat: results[1], companies: results[0]  });
        });




};




exports.post = function(req, res, next){

    var replaceObject = {}, objectId;

    replaceObject.name = req.body.cat_title;
      objectId = req.body.objectId;
    var objectId = req.body.objectId;
    replaceObject.companyId = req.body.companyId;

    console.log(replaceObject);

    Cat.update({"_id": objectId }, {$set: replaceObject }, function(err, object, affected) {
        if (!err) {

            async.parallel([
                    function(callback){
                        Company.find({}).exec(callback);
                    },
                    function(callback){
                        Cat.findOne({ _id: objectId }).exec(callback);
                    }
                ],
// optional callback
                function(err, results){

                    // the results array will equal ['one','two'] even though
                    // the second function had a shorter timeout.

                    res.render('goods_category/edit_cat', { title: 'Express', cat: results[1], companies: results[0], message: "Категория успешно отредактирована"  });
                });


           /* Cat.findOne({ "_id": objectId}, function(err, result) {
                    res.render('goods_category/edit_cat', { title: 'Express', cat: result, message: "Категория успешно отредактирована"  });
            })*/
        }
    });
   

};