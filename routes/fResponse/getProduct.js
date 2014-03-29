
var url = require('url');


exports.get = function(req, res){

    var url_parts = url.parse(req.url, true);

    res.json({"title":"\u041c\u0430\u0440\u0433\u0430\u0440\u0438\u0442\u0430","id":"89","firm_id":"19","category_id":"27","imageUrl":"img\/pizza\/products\/1387105521.png","short_des":"\u0421\u0443\u043f\u0435\u0440 \u043f\u0438\u0446\u0446\u0430","department":"pizza","long_des":"\u041f\u043e\u043b\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438 \u0435\u0442\u043e\u0432\u0430\u0440\u0430","price":"400","firm_name":"pizzasam","firm_name_rus":"\u0427\u0438\u043a\u0430\u0433\u043e \u041f\u0438\u0446\u0446\u0430","firm_delivery_price":"200"});




};


