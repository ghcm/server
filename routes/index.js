
var checkAuth = require("../middleware/checkAuth");
var checkDeparts = require("../middleware/checkDeparts");

module.exports = function(app) {

    app.get('/login', require('./login').get);

    app.post('/upload', require('./photos').post);

    app.post('/login', require('./login').post);

    app.post("/logout", require('./logout').post);


//  companies
    app.get("/add_company", [checkAuth, checkDeparts],  require('./company/add_company').get);
    app.post("/add_company", [checkAuth, checkDeparts],  require('./company/add_company').post);

    app.get("/edit_company/:companyName", [checkAuth, checkDeparts],  require('./company/edit_company').get);
    app.post("/edit_company/:companyName", [checkAuth, checkDeparts],  require('./company/edit_company').post);

    app.get("/show_company/:companyName", [checkAuth, checkDeparts],  require('./company/show_company').get);
    app.get("/all_companies", [checkAuth, checkDeparts],  require('./company/all_companies').get);

    app.post("/del_company", [checkAuth, checkDeparts],  require('./company/del_company').post);


//  departments
    app.get("/add_department", [checkAuth, checkDeparts],  require('./department/add_department').get);
    app.post("/add_department", [checkAuth, checkDeparts],  require('./department/add_department').post);

    app.get("/edit_department/:departName", [checkAuth, checkDeparts],  require('./department/edit_department').get);
    app.post("/edit_department/:departName", [checkAuth, checkDeparts],  require('./department/edit_department').post);
    app.post("/del_depart", [checkAuth, checkDeparts],  require('./department/del_department').post);

    app.get("/all_departments", [checkAuth, checkDeparts],  require('./department/all_departments').get);


//  goods
    app.get("/add_good", [checkAuth, checkDeparts], require('./good/add_good').get);
    app.post("/add_good", [checkAuth, checkDeparts],  require('./good/add_good').post);

    app.get("/edit_good/:goodName", [checkAuth, checkDeparts],  require('./good/edit_good').get);
    app.post("/edit_good/:goodName", [checkAuth, checkDeparts],  require('./good/edit_good').post);

    app.get("/show_good/:goodName", [checkAuth, checkDeparts],  require('./good/show_good').get);
    app.get("/all_goods", [checkAuth, checkDeparts],  require('./good/all_goods').get);
    app.post("/del_good", [checkAuth, checkDeparts],  require('./good/del_good').post);


//  goods categories
    app.get("/add_cat", [checkAuth, checkDeparts],  require('./goods_category/add_cat').get);
    app.post("/add_cat", [checkAuth, checkDeparts],  require('./goods_category/add_cat').post);

    app.get("/edit_cat/:catName", [checkAuth, checkDeparts],  require('./goods_category/edit_cat').get);
    app.post("/edit_cat/:catName", [checkAuth, checkDeparts],  require('./goods_category/edit_cat').post);


    app.get("/all_cats", [checkAuth, checkDeparts], require('./goods_category/all_cats').get);
    app.post("/del_cat", require('./goods_category/del_cat').post);

    app.get('/', [checkAuth, checkDeparts], require('./root').get(app));
    app.get('/admin', [checkAuth, checkDeparts], require('./adminroot').get);



//server response for client side queries

    app.get("/getFirmList", require('./fResponse/firmsList').get);
    app.get("/getBreadCumbs", require('./fResponse/getBreadCumbs').get);
    app.get("/brand", require('./fResponse/brand').get);
    app.get("/getProduct", require('./fResponse/getProduct').get);
    app.get("/getDepartId", require('./fResponse/getDepartId').get);

   app.get('/chat', require('./chat').get);
};




