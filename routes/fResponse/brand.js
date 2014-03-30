
var url = require('url');


exports.get = function(req, res){

    var url_parts = url.parse(req.url, true);

       console.log(url_parts.query.depart);
    if (url_parts.query.popular == "true" && url_parts.query.depart == "pizza") {
        res.json([{"title":"Margarita","id":"89","firm_id":"19","category_id":"27",
            "imageUrl":"1387105521.png",
            "short_des":"Short description","long_des":"Long description","price":"400","delivery_price":"200","name":"San Jose Pizza","name_rus":"San Jose Pizza"}]);
    }

    if (url_parts.query.popular != "true" && url_parts.query.depart == "pizza") {
        res.json({"1":{"firm_id":"19","id":"27","name":"40 см","products":[{"title":"Margarita","id":"89","firm_id":"19","category_id":"27","short_des":"Short description","imageUrl":"1387105521.png",
            "price":"400","firm_name":"San Jose Pizza","firm_name_rus":"San Jose Pizza","delivery_price":"200"}]}});
    }
     console.log(url_parts.query.depart);

    if (url_parts.query.popular != "true" && url_parts.query.depart == "sushi") {

        res.json({"1":{"firm_id":"18","id":"26","name":"Rolls","products":[{"title":"California Rolls","id":"100","firm_id":"18","category_id":"26","short_des":"Short description","imageUrl":"1387464388.png","price":"600","firm_name":"Sumo","firm_name_rus":"Sumo","delivery_price":"200"}]}});
    }

    if (url_parts.query.popular == "true" && url_parts.query.depart == "sushi") {
        res.json([{"title":"California Rolls","id":"100","firm_id":"18","category_id":"26","imageUrl":"1387464388.png","short_des":"Short description","price":"600","delivery_price":"200","name":"Sumo","name_rus":"Sumo"}]);

    }




};


