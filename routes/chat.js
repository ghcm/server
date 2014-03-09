
/*
 * GET login page.
 */


exports.get = function(req, res){
    res.render('chat', { title: 'Express' });
};