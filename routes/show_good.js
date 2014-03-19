
/*
 * GET login page.
 */
var Good = require('models/good').Good;

exports.get = function(req, res){
    var goodName = req.params.goodName;
    console.log(goodName);
    var myDocument = Good.findOne({ name: goodName }, function(err, result) {
        if (err) { /* handle err */ }
        console.log(result);
        if (result) {
            res.render('show_good', { title: 'Express', good: result });
        } else {
            // we don't
        }
    });

};

