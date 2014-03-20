
/*
 * GET login page.
 */
Company = require('models/company').Company;

exports.get = function(req, res){
    var companyName = req.params.companyName;

    var myDocument = Company.find(function(err, result) {
        if (err) { /* handle err */ }

        if (result) {
            res.render('company/all_companies', { title: 'Express', companies: result });
        } else {
            // we don't
        }
    });

};

