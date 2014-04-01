

var Department = require('../../models/department').Department,

Company = require('../../models/company').Company;

var async = require('async');
var url = require('url');


exports.get = function(req, res){




    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query.depart);
    Department.find({name: query.depart}, function(err, result){
        console.log(result);
        if (result.length != 0) {
            var departments = [];
            async.map(result,
                function (item, callback) {
                   // console.log(item);
                    Company.find({department: item._id}, function(err, result) {
                        // console.log(result);

                      //  departments.push(result);

                    }).exec(callback);

                    // res.json(item.getPublicFields());
                },

                function(err, results){
                    res.json(results[0]);
                });
        }
        else {
           // console.log(result);
        }

    });


  //  res.json([{"age":"0","id":"19","imageUrl":"files\/company\/31706-16rg025.jpg","name_rus":"\u0427\u0438\u043a\u0430\u0433\u043e \u041f\u0438\u0446\u0446\u0430","delivery_price":"200","min_price":"500","name":"pizzasam","snippet":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"},{"age":"0","id":"20","imageUrl":"img\/pizza\/1387455078.jpg","name_rus":"\u0421\u0430\u043d-\u0425\u043e\u0441\u0435 \u041f\u0438\u0446\u0446\u0430","delivery_price":"250","min_price":"450","name":"sanjose","snippet":"sanjose"},{"age":"0","id":"21","imageUrl":"img\/pizza\/1387455282.gif","name_rus":"\u041a\u0430\u043f\u0440\u0438-\u041f\u0438\u0446\u0446\u0430","delivery_price":"300","min_price":"470","name":"capripizza","snippet":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"},{"age":"0","id":"22","imageUrl":"img\/pizza\/1387455348.jpg","name_rus":"unmomento","delivery_price":"310","min_price":"110","name":"unmomento","snippet":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"},{"age":"0","id":"23","imageUrl":"img\/pizza\/1387455398.jpg","name_rus":"\u041f\u0438\u0446\u0446\u0430 \u0414\u0436\u0435\u0439\u043a\u0430","delivery_price":"150","min_price":"250","name":"jakespizza","snippet":"jakespizza"},{"age":"0","id":"24","imageUrl":"img\/pizza\/1387456700.jpg","name_rus":"\u0414\u0443\u0431\u043e\u0432\u0430\u044f \u0441\u043a\u0430\u043b\u0430","delivery_price":"400","min_price":"300","name":"oakcliff","snippet":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"},{"age":"0","id":"25","imageUrl":"img\/pizza\/1387456777.jpg","name_rus":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435","delivery_price":"210","min_price":"400","name":"virgilious","snippet":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"},{"age":"0","id":"26","imageUrl":"img\/pizza\/1387457101.gif","name_rus":"\u0418\u0434\u0435\u0430\u043b\u044c\u043d\u0430\u044f \u043f\u0438\u0446\u0446\u0430","delivery_price":"350","min_price":"200","name":"perfectpizza","snippet":"\u041a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"}]);
};
