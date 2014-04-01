
/*
 * GET login page.
 */
var Company = require('../../models/company').Company;

exports.get = function(req, res){

    Company.find(function(err, result) {
        res.render('goods_category/add_cat', { title: 'Express', companies: result });
    });
};




var Cat = require('../../models/cat').Cat;

exports.post = function(req, res, next){

    console.log(req.params);

    var cat = new Cat({name: req.body.cat_title, companyId: req.body.company});

    cat.save(function(err, cat, affected) {
        if (!err) {
            Company.find(function(err, result) {
                res.render('goods_category/add_cat', { title: 'Express', cat: cat, message: "Категория успешно добавлена", companies: result });
            });
        }
        else {
            console.log(err);
            Company.find(function(err, result) {
                res.render('goods_category/add_cat', { title: 'Express', error: err.errors });
            });
        }
    });

}