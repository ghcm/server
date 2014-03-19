
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


    //goods
    app.get("/add_good", require('./add_good').get);
    app.post("/add_good", require('./add_good').post);

    app.get("/edit_good/:goodName", require('./edit_good').get);
    app.post("/edit_good/:goodName", require('./edit_good').post);

    app.get("/show_good/:goodName", require('./show_good').get);
    app.get("/all_goods", require('./all_goods').get);


    //goods categories
    app.get("/add_cat", require('./add_cat').get);
    app.post("/add_cat", require('./add_cat').post);

   app.get("/edit_cat/:catName", require('./edit_cat').get);
    app.post("/edit_cat/:catName", require('./edit_cat').post);


    app.get("/all_cats", require('./all_cats').get);




    app.get('/', checkAuth, require('./root').get);

   app.get('/chat', require('./chat').get);
};




