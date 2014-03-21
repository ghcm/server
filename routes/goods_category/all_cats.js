
/*
 * GET login page.
 */
Cat = require('models/cat').Cat;

exports.get = function(req, res){

    var myDocument = Cat.find(function(err, result) {
        if (err) { /* handle err */ }

        if (result) {
            res.render('goods_category/all_cats', { title: 'Express', cats: result });
        } else {
            // we don't
        }
    });

};

