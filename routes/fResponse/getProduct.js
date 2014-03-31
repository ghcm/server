
var url = require('url');
var fs = require("fs");

exports.get = function(req, res){

    var url_parts = url.parse(req.url, true);
    if (url_parts.query.depart == "sushi") {
        fs.readFile(__dirname + "/json/getProductSushi.json", "utf8", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    }
    else {
        fs.readFile(__dirname + "/json/getProductPizza.json", "utf8", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    }
};


