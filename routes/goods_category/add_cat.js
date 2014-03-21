
/*
 * GET login page.
 */


exports.get = function(req, res){
    res.render('goods_category/add_cat', { title: 'Express' });
};




var Cat = require('models/cat').Cat;

exports.post = function(req, res, next){

    console.log(req.params);

    var cat = new Cat({name: req.body.cat_title});


    cat.save(function(err, cat, affected) {
        if (!err) {
            res.render('goods_category/add_cat', { title: 'Express', cat: cat, message: "Категория успешно добавлена" });
        }
        else {
            console.log(err);
            res.render('goods_category/add_cat', { title: 'Express', error: err.errors });
        }
    });

}