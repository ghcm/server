
var checkAuth = require("middleware/checkAuth");

module.exports = function(app) {

    app.get('/login', require('./login').get);

    app.post('/login', require('./login').post);

    app.post("/logout", require('./logout').post);

    app.get('/', checkAuth, require('./root').get);

   app.get('/chat', require('./chat').get);
};




