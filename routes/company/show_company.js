
/*
 * GET login page.
 */


exports.get = function(req, res){
    var companyName = req.params.companyName;

    var myDocument = Company.findOne({ name: companyName }, function(err, result) {
        if (err) { /* handle err */ }

        if (result) {
            res.render('company/show_company', { title: 'Express', company: result });
        } else {
            // we don't
        }
    });

};

