
var url = require('url');


exports.get = function(req, res){

    var url_parts = url.parse(req.url, true);

    if (url_parts.query.popular == "true") {
        res.json([{"title":"\u041c\u0430\u0440\u0433\u0430\u0440\u0438\u0442\u0430","id":"89","firm_id":"19","category_id":"27",
            "imageUrl":"1387105521.png",
            "short_des":"\u0421\u0443\u043f\u0435\u0440 \u043f\u0438\u0446\u0446\u0430","long_des":"\u041f\u043e\u043b\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438 \u0435\u0442\u043e\u0432\u0430\u0440\u0430","price":"400","delivery_price":"200","name":"pizzasam","name_rus":"\u0427\u0438\u043a\u0430\u0433\u043e \u041f\u0438\u0446\u0446\u0430"},{"title":"\u041f\u0438\u0446\u0446\u0435\u0440\u0438\u044f","id":"95","firm_id":"19","category_id":"27",
            "imageUrl":"1387460966.png",
            "short_des":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u0438\u0446\u0446\u044b","long_des":"\u043f\u043e\u043b\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u0438\u0446\u0446\u044b","price":"700","delivery_price":"200","name":"pizzasam","name_rus":"\u0427\u0438\u043a\u0430\u0433\u043e \u041f\u0438\u0446\u0446\u0430"},{"title":"\u041c\u0430\u0440\u0433\u0430\u0440\u0438\u0442\u0430 2","id":"96","firm_id":"19","category_id":"27",
            "imageUrl":"1387461455.png",
            "short_des":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u0438\u0446\u0446\u044b","long_des":"\u041f\u043e\u043b\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u0438\u0446\u0446\u044b","price":"700","delivery_price":"200","name":"pizzasam","name_rus":"\u0427\u0438\u043a\u0430\u0433\u043e \u041f\u0438\u0446\u0446\u0430"}]);
    }

    if (url_parts.query.popular != "true") {
        res.json({"1":{"firm_id":"19","id":"27","name":"40 см","products":[{"title":"Маргарита","id":"89","firm_id":"19","category_id":"27","short_des":"Супер пицца","imageUrl":"1387105521.png",
            "price":"400","firm_name":"pizzasam","firm_name_rus":"Чикаго Пицца","delivery_price":"200"},{"title":"Пиццерия","id":"95","firm_id":"19","category_id":"27","short_des":"Короткое описание пиццы",
            "imageUrl":"1387460966.png",
            "price":"700","firm_name":"pizzasam","firm_name_rus":"Чикаго Пицца","delivery_price":"200"},{"title":"Маргарита 2","id":"96","firm_id":"19","category_id":"27","short_des":"Короткое описание пиццы",
            "imageUrl":"1387461455.png",
            "price":"700","firm_name":"pizzasam","firm_name_rus":"Чикаго Пицца","delivery_price":"200"},{"title":"Венчеццо","id":"97","firm_id":"19","category_id":"27","short_des":"Короткое описание пиццы",
            "imageUrl":"1387461571.png",
            "price":"700","firm_name":"pizzasam","firm_name_rus":"Чикаго Пицца","delivery_price":"200"},{"title":"Домашняя","id":"98","firm_id":"19","category_id":"27","short_des":"Короткое описание пиццы",
            "imageUrl":"1387461604.png",
            "price":"567","firm_name":"pizzasam","firm_name_rus":"Чикаго Пицца","delivery_price":"200"},{"title":"Городская","id":"99","firm_id":"19","category_id":"27","short_des":"Короткое описание пиццы",
            "imageUrl":"1387461635.png",
            "price":"456","firm_name":"pizzasam","firm_name_rus":"Чикаго Пицца","delivery_price":"200"}]}});
    }




};


