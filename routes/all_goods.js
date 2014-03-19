
/*
 * GET login page.
 */
Good = require('models/good').Good;

exports.get = function(req, res){

    var myDocument = Good.find(function(err, result) {
        if (err) { /* handle err */ }

        if (result) {
            res.render('all_goods', { title: 'Express', goods: result });
        } else {
            // we don't
        }
    });

};

