
var url = require('url');
var fs = require("fs");
Good = require('../../models/good').Good;

exports.get = function(req, res){

    var url_parts = url.parse(req.url, true);

    if (url_parts.query.popular == "true" && url_parts.query.depart == "pizza") {

        fs.readFile(__dirname + "/json/getPizzaTrue.json", "utf8", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    }

    if (url_parts.query.popular != "true" && url_parts.query.depart == "pizza") {

        var query = url_parts.query;

        console.log(query);


        Good.find({departId: query, companyId: query.pizzaFirmId}, function(err, data){
            res.json(data);
            console.log(data);
        });


       /* fs.readFile(__dirname + "/json/getPizza.json", "utf8", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data));
        });*/
    }
  //   console.log(url_parts.query.depart);

    if (url_parts.query.popular != "true" && url_parts.query.depart == "sushi") {
        fs.readFile(__dirname + "/json/getSushi.json", "utf8", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    }

    if (url_parts.query.popular == "true" && url_parts.query.depart == "sushi") {

        fs.readFile(__dirname + "/json/getSushiTrue.json", "utf8", function(err, data) {
//            console.log(data);
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    }




};


