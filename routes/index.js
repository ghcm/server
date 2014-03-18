
var checkAuth = require("middleware/checkAuth");

module.exports = function(app) {

    app.get('/login', require('./login').get);

    app.post('/upload', require('./photos').post);

    app.post('/login', require('./login').post);

    app.post("/logout", require('./logout').post);

//companies
    app.get("/add_company", require('./add_company').get);
    app.post("/add_company", require('./add_company').post);

    app.get("/edit_company/:companyName", require('./edit_company').get);
    app.post("/edit_company/:companyName", require('./edit_company').post);

    app.get("/show_company/:companyName", require('./show_company').get);
    app.get("/all_companies", require('./all_companies').get);




//    departments
    app.get("/add_department", require('./add_department').get);
    app.post("/add_department", require('./add_department').post);

    app.get("/edit_department/:departName", require('./edit_department').get);
    app.post("/edit_department/:departName", require('./edit_department').post);
    app.get("/all_departments", require('./all_departments').get);



    app.get('/', checkAuth, require('./root').get);

   app.get('/chat', require('./chat').get);
};




