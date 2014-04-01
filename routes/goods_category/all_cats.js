
/*
 * GET login page.
 */
var Cat = require('../../models/cat').Cat;
var async = require('async');
var Company = require('../../models/company').Company;

exports.get = function(req, res){



    var companies = {};
    Company.find(function(err, result) {
        async.map(result,
            function (item, callback) {
                Cat.find({companyId: item._id}, function(err, result) {
                    // console.log(result);

                    companies[item.name] = result;

                }).exec(callback);

                // res.json(item.getPublicFields());
            },

            function(err, results){
                res.render('goods_category/all_cats', { title: 'Express', companies: companies });
                console.log(companies);
            });


    });



/*    var myDocument = Cat.find(function(err, result) {
        if (err) { *//* handle err *//* }

        if (result) {
            res.render('goods_category/all_cats', { title: 'Express', cats: result });
        } else {
            // we don't
        }
    });*/

};

