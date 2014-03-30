
var url = require('url');


exports.get = function(req, res){

    var url_parts = url.parse(req.url, true);

       console.log(url_parts.query.depart);
    if (url_parts.query.popular == "true" && url_parts.query.depart == "pizza") {
        res.json([{"title":"\u041c\u0430\u0440\u0433\u0430\u0440\u0438\u0442\u0430","id":"89","firm_id":"19","category_id":"27",
            "imageUrl":"1387105521.png",
            "short_des":"\u0421\u0443\u043f\u0435\u0440 \u043f\u0438\u0446\u0446\u0430","long_des":"\u041f\u043e\u043b\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438 \u0435\u0442\u043e\u0432\u0430\u0440\u0430","price":"400","delivery_price":"200","name":"pizzasam","name_rus":"\u0427\u0438\u043a\u0430\u0433\u043e \u041f\u0438\u0446\u0446\u0430"},{"title":"\u041f\u0438\u0446\u0446\u0435\u0440\u0438\u044f","id":"95","firm_id":"19","category_id":"27",
            "imageUrl":"1387460966.png",
            "short_des":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u0438\u0446\u0446\u044b","long_des":"\u043f\u043e\u043b\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u0438\u0446\u0446\u044b","price":"700","delivery_price":"200","name":"pizzasam","name_rus":"\u0427\u0438\u043a\u0430\u0433\u043e \u041f\u0438\u0446\u0446\u0430"},{"title":"\u041c\u0430\u0440\u0433\u0430\u0440\u0438\u0442\u0430 2","id":"96","firm_id":"19","category_id":"27",
            "imageUrl":"1387461455.png",
            "short_des":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u0438\u0446\u0446\u044b","long_des":"\u041f\u043e\u043b\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u0438\u0446\u0446\u044b","price":"700","delivery_price":"200","name":"pizzasam","name_rus":"\u0427\u0438\u043a\u0430\u0433\u043e \u041f\u0438\u0446\u0446\u0430"}]);
    }

    if (url_parts.query.popular != "true" && url_parts.query.depart == "pizza") {
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
     console.log(url_parts.query.depart);

    if (url_parts.query.popular != "true" && url_parts.query.depart == "sushi") {

        res.json({"1":{"firm_id":"18","id":"26","name":"тест","products":[{"title":"Суши №1","id":"100","firm_id":"18","category_id":"26","short_des":"Короткое описание суши","imageUrl":"1387464388.png","price":"600","firm_name":"testcompany","firm_name_rus":"Тест","delivery_price":"200"},{"title":"Суши №2","id":"101","firm_id":"18","category_id":"26","short_des":"Короткое описание суши","imageUrl":"1387464466.jpg","price":"700","firm_name":"testcompany","firm_name_rus":"Тест","delivery_price":"200"},{"title":"Суши №3","id":"102","firm_id":"18","category_id":"26","short_des":"Короткое описание суши","imageUrl":"1387464500.png","price":"445","firm_name":"testcompany","firm_name_rus":"Тест","delivery_price":"200"},{"title":"Суши №4","id":"103","firm_id":"18","category_id":"26","short_des":"Короткое описание суши","imageUrl":"1387464667.png","price":"678","firm_name":"testcompany","firm_name_rus":"Тест","delivery_price":"200"},{"title":"Суши №5","id":"104","firm_id":"18","category_id":"26","short_des":"Короткое описание суши","imageUrl":"1387464705.png","price":"600","firm_name":"testcompany","firm_name_rus":"Тест","delivery_price":"200"},{"title":"Суши №6","id":"105","firm_id":"18","category_id":"26","short_des":"Короткое описание суши","imageUrl":"1387464732.png","price":"600","firm_name":"testcompany","firm_name_rus":"Тест","delivery_price":"200"},{"title":"Суши №7","id":"106","firm_id":"18","category_id":"26","short_des":"Короткое описание суши","imageUrl":"1387464764.png","price":"500","firm_name":"testcompany","firm_name_rus":"Тест","delivery_price":"200"}]}});
    }

    if (url_parts.query.popular == "true" && url_parts.query.depart == "sushi") {
        res.json([{"title":"\u0421\u0443\u0448\u0438 \u21161","id":"100","firm_id":"18","category_id":"26","imageUrl":"1387464388.png","short_des":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0441\u0443\u0448\u0438","long_des":"\u041f\u043e\u043b\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0442\u043e\u0432\u0430\u0440\u0430","price":"600","delivery_price":"200","name":"testcompany","name_rus":"\u0422\u0435\u0441\u0442"},{"title":"\u0421\u0443\u0448\u0438 \u21162","id":"101","firm_id":"18","category_id":"26","imageUrl":"1387464466.jpg","short_des":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0441\u0443\u0448\u0438","long_des":"\u041f\u043e\u043b\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0441\u0443\u0448\u0438","price":"700","delivery_price":"200","name":"testcompany","name_rus":"\u0422\u0435\u0441\u0442"},{"title":"\u0421\u0443\u0448\u0438 \u21163","id":"102","firm_id":"18","category_id":"26","imageUrl":"1387464500.png","short_des":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0441\u0443\u0448\u0438","long_des":"\u041f\u043e\u043b\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0442\u043e\u0432\u0430\u0440\u0430","price":"445","delivery_price":"200","name":"testcompany","name_rus":"\u0422\u0435\u0441\u0442"}]);

    }




};


