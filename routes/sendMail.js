
var nodemailer = require("nodemailer");

exports.post = function(req, res, next) {

    console.log(req.body);

    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "myemstore@gmail.com",
            pass: "a88561123"
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Emstore.org ✔ <myemstore@gmail.com>", // sender address
        to: "nostsaber@yandex.ru", // list of receivers
        subject: "Заказ товара в ИНТЕРНЕТ-МАГАЗИНЕ", // Subject line
        text: "аказ товара в ИНТЕРНЕТ-МАГАЗИНЕ", // plaintext body
        html: "<b>Hello world ✔</b>" // html body
    }

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            res.json({status: "success", message: "Ваш заказ находится в обработке!"});
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });



};

