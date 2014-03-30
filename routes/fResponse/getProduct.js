
var url = require('url');


exports.get = function(req, res){

    var url_parts = url.parse(req.url, true);
    if (url_parts.query.depart == "sushi") {
        res.json({"title":"California Rolls","id":"100","firm_id":"18","category_id":"26","imageUrl":"1387464388.png","short_des":"Short description","department":"sushi","long_des":"Long description","price":"600","firm_name":"testcompany","firm_name_rus":"Sumo","firm_delivery_price":"200"});
    }
    else {
        res.json({"title":"Margarita","id":"89","firm_id":"19","category_id":"27","imageUrl":"1387105521.png","short_des":"Short description","department":"pizza","long_des":"Long description","price":"400","firm_name":"pizzasam","firm_name_rus":"San Jose pizza","firm_delivery_price":"200"});
    }





};


