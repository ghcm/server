
var nodemailer = require("nodemailer");
var User = require('../models/user').User;

var config = require("../config");
var email = config.get("contacts:email");


exports.post = function(req, res, next) {



        var goods = req.body.goodsArray;
        goods = JSON.parse(goods);

        var user = req.body.user;
        user = JSON.parse(user);

        var text = "<b>Информация о заказчике:</b><br>-----------------------------------------------------------------------------------<br>";

        text += "ФИО: " + user.name + "<br/>";
        text += "Телефон: " + user.phone + "<br/>";
        text += "Адрес: " + user.address + "<br/>";
        text += "Комментарий: " + user.comment + "<br><br><br>";


        text += "<b>Список заказанных товаров</b><br>-----------------------------------------------------------------------------------<br>";

        for (var i = 0; i < goods.length; i++) {
            text += "Наименование: " + goods[i].name + "<br/>";
            text += "Количество: " + goods[i].count + "<br/>";
            text += "Стоимость каждого: " + goods[i].price + "<br/>";
            text += "<hr />";
        }


        sendMail(email);

        function sendMail(toEmail) {
            var smtpTransport = nodemailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: "myemstore@gmail.com",
                    pass: "a88561123"
                }
            });

// setup e-mail data with unicode symbols
            var mailOptions = {
                from: "Заказ товара в ИНТЕРНЕТ-МАГАЗИНЕ <myemstore@gmail.com>", // sender address
                to: toEmail, // list of receivers
                subject: "Заказ товара в ИНТЕРНЕТ-МАГАЗИНЕ", // Subject line
                text: "Заказ товара в ИНТЕРНЕТ-МАГАЗИНЕ", // plaintext body
                html: text // html body
            }

// send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                } else {
                    res.json({status: "success", message: "Ваш заказ находится в обработке!"});
                    console.log("Message sent: " + response.message);
                }

                // if you don't want to use this transport object anymore, uncomment following line
                //smtpTransport.close(); // shut down the connection pool, no more messages
            });
        }




};

