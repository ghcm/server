
/*
 * GET login page.
 */
Good = require('models/good').Good;
Cat = require('models/cat').Cat;
var async = require('async');

exports.get = function(req, res){
    var categories = {};
    Cat.find(function(err, result) {
        async.map(result,
            function (item, callback) {
                Good.find({cat: item._id}, function(err, result) {
                   // console.log(result);

                    categories[item.name] = result;

                }).exec(callback);

               // res.json(item.getPublicFields());
            },

            function(err, results){
                res.render('all_goods', { title: 'Express', goods: categories });
            console.log(categories);
        });


    });
/*
    Cat.find(function(err, result) {
        for (var i = 0; i < result.length; i++) {
            var obj = result[i];

            Good.find(function(err, result) {
                if (err) { }

                    if (result) {
                        res.render('all_goods', { title: 'Express', goods: result });
                    } else {
                        // we don't
                    }
            });

        }
    })*/

/*    var myDocument = Good.find(function(err, result) {
        if (err) { *//* handle err *//* }

        if (result) {
            res.render('all_goods', { title: 'Express', goods: result });
        } else {
            // we don't
        }
    });*/

};

