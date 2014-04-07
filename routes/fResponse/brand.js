
var url = require('url');
var fs = require("fs");
var Good = require('../../models/good').Good;
var Cat = require('../../models/cat').Cat;
var async = require("async");

exports.get = function(req, res){

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    //http://localhost:3000/brand?depart=53380ec02163931a0df3794a&pizzaFirmId=533b1307f6f5f80214465419&popular=true

    if (url_parts.query.popular == "true") {


        console.log( query.pizzaFirmId);

        Good.find({"belongs.companyId": query.pizzaFirmId}, function(err, result2) {
            if (err) next(err);
            console.log(result2);


        }).limit(3).exec(function(err, result3) { res.json(result3); });;

       /* fs.readFile(__dirname + "/json/getPizzaTrue.json", "utf8", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data));
        });*/
    }

    if (url_parts.query.popular != "true") {


        var cats = {};
      //  console.log(query);

    /*    Good.find({"belongs.catId": "533ada32755fe6262d153def"}, function(err, result1) {
            console.log(result1);



        })*/

        Cat.find({companyId: query.pizzaFirmId}, function(err, result) {
            async.map(result,
                function (item, callback) {
                    Good.find({"belongs.catId": item._id.toString()}, function(err, result2) {
                        if (err) next(err);

                    })
                       .exec(function(err, res) {  cats[item.name] = res;  callback()});
            },
                function(err, results){
                    if (err) next(err);
                    res.json(cats);
                   // console.log(cats);
                }

            )
        });



       /* fs.readFile(__dirname + "/json/getPizza.json", "utf8", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data));
        });*/
    }
  //   console.log(url_parts.query.depart);

  /*  if (url_parts.query.popular != "true" && url_parts.query.depart == "sushi") {
        fs.readFile(__dirname + "/json/getSushi.json", "utf8", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    }*/

 /*   if (url_parts.query.popular == "true" && url_parts.query.depart == "sushi") {

        fs.readFile(__dirname + "/json/getSushiTrue.json", "utf8", function(err, data) {
//            console.log(data);
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    }*/




};


