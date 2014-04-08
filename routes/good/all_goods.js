var config = require("../../config");

var filePath = config.get("fileOrganizer:good:path");
var filePathView = config.get("fileOrganizer:good:viewPath");
/*
 * GET login page.
 */
Good = require('../../models/good').Good;
Cat = require('../../models/cat').Cat;
var async = require('async');
var Company = require('../../models/company').Company;


exports.get = function(req, res){
    var companies = {};


    var categories = {};
    Cat.find(function(err, result) {
        async.map(result,
            function (item, callback) {
                Good.find({"belongs.catId": item._id.toString()}).exec(function(err, result) { console.log(result); categories[item.name] = result; callback(); });

                // res.json(item.getPublicFields());
            },

            function(err, results){
                //console.log(categories);
                res.render(filePath + '/all_goods', { title: 'Express', goods: categories, filePathView: filePathView });

            });
    });



/*
    Company.find().exec(function(err, comps) {

        for (var i = 0; i < comps.length; i++) {

            Cat.find({companyId: comps[i]._id}).exec(function(err, cats) {
                console.log(i);
                for (var j = 0; j < cats.length; j++) {

//                    companies[comps[i].name] = cats[j].name;
                    Good.find({cat: cats[j]._id}).exec(function(err, goods) {

                        console.log(goods);

                    });
                }
            });
        }
    });

*/




        /*    async.waterfall([

            function(callback) {
                Company.find(function(err, result) {

                }).exec(function(err, res) { callback(null, res); });
            },



            function(res, callback2) {
                async.map(res, function(company, callback) {  Cat.find({companyId: company._id}).exec(function(err, cat) {companies[company.name] = cat; callback(null, cat);}) }, function(err, res2) {  callback2(null, res2);  });
            },
        //        companies[company.name] = res[0]; callback(null, res);
            function(cats, callback3) {
                console.log(companies);
                console.log("=====================");
                async.map(cats, function(cat, callback) {  Good.find({cat: cat[0]._id}).exec(function(err, good) {
                   // console.log(cat[0]);
                }) }, function(err, resgoodmap) {   });



               // async.map(res, function(company) {  Cat.find({companyId: company._id}).exec(function(err, res) { console.log(res); callback(err, res); }); });
            },
            function(res, callback) {
             //   console.log(res);
                //async.map(res, function(company) {  Cat.find({companyId: company._id}).exec(function(err, res) { console.log(res); callback(err, res); }); });
            }

              *//*  function(res, callback) {
            async.map(res, function(company) { Cat.find({companyId: company._id})  });


            //console.log(res);
        }*//*


       // Cat.find({companyId: company._id}).exec(function(err, cat) {   categories[company.name] = cat; callback()});

    ]);*/



/*    Company.find(function(err, result) {
        var categories = {};
        async.series([
        function(callback) {
            callback(null, res);
        },
        function(callback) {
            callback(null, res);
        }

        ]*/



     /*       function (company, callback) {

                Cat.find({companyId: company._id}).exec(function(err, cat) {   categories[company.name] = cat; callback()});

                // res.json(item.getPublicFields());
            },

            function(err, results){
                res.render(filePath + '/all_goods', { title: 'Express', goods: categories, filePathView: filePathView });
                console.log(categories);
            });*/


/*        async.map(result1,
            function (item2, callback) {
                Good.find({cat: item2._id}).exec(function(err, res) {   categories[item.name] = res;  callback()});

                // res.json(item.getPublicFields());
            },
            function(err, results){
                //  res.render(filePath + '/all_goods', { title: 'Express', goods: categories, filePathView: filePathView });
                //console.log(categories);
            });*/

  //  );
/*    Cat.find(function(err, result) {
        async.map(result,
            function (item, callback) {
                Good.find({cat: item._id}, function(err, result) {
                   // console.log(result);



                }).exec(function(err, res) {   categories[item.name] = res;  callback()});

               // res.json(item.getPublicFields());
            },

            function(err, results){
                res.render(filePath + '/all_goods', { title: 'Express', goods: categories, filePathView: filePathView });
            console.log(categories);
        });


    });*/
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

