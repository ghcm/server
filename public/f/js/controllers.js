'use strict';

/* Controllers */

function ListCtrl($scope, $http, $rootScope, webStorage, $routeParams ) {
    $rootScope.header = "ИНТЕРНЕТ-МАГАЗИН";

    $http.get('/getDepartId', {params: {depart: $routeParams.department}}).
        success(function(data, status, headers, config) {
            var listitems = data.listitems;
            var depart = data.depart;
            $scope.departmentId = (depart) ? depart._id : "";
            $scope.breadcumbs = {
                depart: (depart) ? depart.name : ""
            };

            $scope.pizzafirms = listitems;
            $scope.department  = $routeParams.department;

            if (!$routeParams.department && depart && depart.name) $routeParams.department = (depart) ? depart.name : ""


  /*          $http.get('/getFirmList', {params: {depart:  $scope.departmentId}}).
                success(function(data, status, headers, config) {
                    $scope.pizzafirms = data;
                    $scope.department = $routeParams.department;

                    //$scope.htmlReady();
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });*/

            $rootScope.basket = webStorage.get("goodsCount");



        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        /* $scope.pizzafirms = Pizza.query({depart: $routeParams.department}, function () {
             $scope.htmlReady();
         });*/



   // $scope.breadcumbs = commonMethods.getStaticBreadcumbs($routeParams.department);

   // $scope.firm_detail = Firm.get({ pizzaFirmId: $routeParams.firmId });


   // $scope.categoryName = Pizza.get({ departName: $routeParams.department });//для breadcrumbs

    //console.log( $scope.categoryName );

}

function DetailCtrl($scope, $http, $routeParams, $rootScope, webStorage, $templateCache, $location) {

    //$rootScope.header = "Pizza App";
   // $scope.categoryName = Pizza.get({ departName: $routeParams.department });//для breadcrumbs


    $http.get('/getBreadCumbs', {params: {depart: $routeParams.department, company: $routeParams.firmId}}).
        success(function(data, status, headers, config) {
            $scope.breadcumbs = data;
            console.log(  $scope.breadcumbs );

            //$scope.htmlReady();
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

   //сперва вытягиваем популярное, потом все остальное
/*    $scope.pizzafirm = Brand.query({ pizzaFirmId: $routeParams.firmId, popular: true, depart: $routeParams.department }, function (response) {

        try {
            $scope.deliveryCost = response[0].delivery_price;


            //раздел - передается как параметр - очень важен, так как влияет из какой базы будут тянуться данные - должна быть
            // папка фирм с таким именем и товары в ней
            $scope.department = $routeParams.department;

            //$scope.categoryName = "pizza";//для breadcrumbs
            //console.log(response[0].name);
            $scope.firm_name_rus = response[0].name_rus;

            $scope.categories = Brand.query({ pizzaFirmId: $routeParams.firmId, getCategories: true, depart: $routeParams.department });
        }
        catch (e) {

        }


    });*/



    $http.get('/brand', {params: { pizzaFirmId: $routeParams.firmId, popular: true, depart: $routeParams.department }}).
        success(function(data, status, headers, config) {
            $scope.pizzafirm = data;
            $scope.deliveryCost = (data[0]) ? data[0].delivery_price : "";


            //раздел - передается как параметр - очень важен, так как влияет из какой базы будут тянуться данные - должна быть
            // папка фирм с таким именем и товары в ней
            $scope.department = $routeParams.department;

            //$scope.categoryName = "pizza";//для breadcrumbs
            //console.log(response[0].name);
            $scope.firm_name_rus = (data[0]) ? data[0].name_rus : "";

           // $scope.categories = Brand.query({ pizzaFirmId: $routeParams.firmId, getCategories: true, depart: $routeParams.department });

            $http.get('/brand', {params: { pizzaFirmId: $routeParams.firmId, getCategories: true, depart: $routeParams.department }}).
                success(function(cats, status, headers, config) {
                    console.log(cats);
                    $scope.categories = cats;

//                    $scope.breadcumbs = commonMethods.getStaticBreadcumbs($routeParams.department);

                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    $scope.count = 1;

    $scope.changeCountMinus = function (id) {
        commonMethods.minusCount.call(this, id, $scope, webStorage, false);
    }

    $scope.changeCountPlus = function (id) {
        commonMethods.plusCount.call(this, id, $scope, webStorage, false);
    }

    $scope.changeRoute = function (a, b) {
        //alert(a);
        window.location = window.location.pathname + '#!/products/' + $routeParams.department + '/' + a + '/product_card/' + b;

        var $body = $(document.body)
        $body.removeClass('modal-open').addClass('modal-close');
        $("div.modal-backdrop").remove();
        //$("div.modal-backdrop.fade").removeClass("in");

        //$("#closeModal").trigger("click");
        //window.location = window.location.pathname + '#!/pizza/' + a + '/product_card/' + b;
       // $(".modal-backdrop").remove();
       // $('#myModal').modal('hide');

    }

    $scope.addChatBox = function(id) {
       // //console.log($routeParams);
        $scope.product_detail = commonMethods.getProduct.call(this, id, $routeParams.firmId, $scope, webStorage, $routeParams.department, $http);
       // alert($scope.product_detail);
    };

    $scope.toBasketFunc = function () {
        commonMethods.toBasketFunc.call(this, $scope, $rootScope, webStorage, $routeParams)
    }


}

function ProductCardCtrl($scope, $routeParams, $rootScope, webStorage, $http) {

    //раздел - передается как параметр - очень важен, так как влияет из какой базы будут тянуться данные - должна быть
    // папка фирм с таким именем и товары в ней
    $scope.department = $routeParams.department;


    $http.get('/getBreadCumbs', {params: {depart: $routeParams.department, company: $routeParams.firmId, goodId: $routeParams.pizzaId}}).
        success(function(data, status, headers, config) {
            $scope.breadcumbs = data;
            console.log(  $scope.breadcumbs );

            //$scope.htmlReady();
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

   // $scope.categoryName = "pizza";//для breadcrumbs


    var index = parseInt($routeParams.pizzaId);
    --index;

    $scope.product_detail = commonMethods.getProduct.call(this, $routeParams.pizzaId, $routeParams.firmId, $scope, webStorage, $routeParams.department, $http);

   // $scope.breadcumbs = commonMethods.getStaticBreadcumbs($routeParams.department);

    console.log($scope.product_detail);

    $scope.changeCountMinus = function (id) {
        commonMethods.minusCount.call(this, id, $scope, webStorage, false);
    }

    $scope.changeCountPlus = function (id) {
        commonMethods.plusCount.call(this, id, $scope, webStorage, false);
    }


    $scope.toBasketFunc = function () {
        commonMethods.toBasketFunc.call(this, $scope, $rootScope, webStorage, $routeParams.department)
    }

}

function BasketCtrl ($scope, webStorage, $rootScope, $http) {

     $("[href='#step1'], [href='#step2'], [href='#step3'], [href='#step4']").on("click", function (e) {
        return false;
     });

    var $body = $(document.body)
    $body.removeClass('modal-open').addClass('modal-close');
    $("div.modal-backdrop").remove();

    $scope.basket = webStorage.get("products");

    console.log($scope.basket);

    $scope.basketLength = $scope.basket.length;

    $scope.userInfo =  webStorage.get("user");

    $scope.name = $scope.userInfo.name;
    $scope.phone = $scope.userInfo.phone;
    $scope.address = $scope.userInfo.address;
    $scope.comment = "";

    $scope.saveUserInfo = function  () {
        var info = {};
        info.name = $scope.name;
        info.phone = $scope.phone;
        info.address = $scope.address;
        info.comment =  $scope.comment;
        webStorage.add("user", info);
    }

    $scope.deleteItem = function (index) {
        var newStor = webStorage.get("products");
        newStor.splice($scope.basket.indexOf(index), 1);
        webStorage.add("products", newStor);
        $scope.basket = webStorage.get("products");
        changeSum();
        $rootScope.basketProductCount = webStorage.get("products").length;
    }
    
    $scope.setTrashEmpty = function () {

        var goods = webStorage.get("products");
        var user = webStorage.get("user");

        var goodsArray = JSON.stringify(goods);
        var userInfo =  JSON.stringify(user);

//var da = 1;
      //  console.log(da);

        //for (var i = 0; i < goods.length; i++) {

          //  $scope.addOrder = Order.save({ "goodsArray": goods });




     /*   $http({

            method: 'POST',
            url: "food/pizza/addOrder.php",
            data: { "haha": da },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });*/

     //   $http.post('food/pizza/addOrder.php', da);

       // }



      //  $scope.product_detail = Pizza.get({ pizzaFirmId: firm_id, pizzaProductId: id },function(response) {

        webStorage.add("products", []);
        $scope.basket = webStorage.get("products");
        $rootScope.basketProductCount = webStorage.get("products").length;
        changeSum();
    }

    $scope.changeCountPlus = function (index) {
        commonMethods.plusCount.call(this, index, $scope, webStorage, true);
        changeSum();
    }

    $scope.changeCountMinus = function (index) {
        commonMethods.minusCount.call(this, index, $scope, webStorage, true);
        changeSum();
    }

    $scope.confirmation = function (result) {
        if (typeof result == "boolean" && result === true) {

            var goods = webStorage.get("products");
            var user = webStorage.get("user");

            var goodsArray = JSON.stringify(goods);
            var userInfo =  JSON.stringify(user);

            $http.post("/sendMail", { "goodsArray": goodsArray, "user": userInfo }, function (data) {
                if (data) {
                    var arr = [];
                    alert("Ваш заказ успешно добавлен.");
                    var orders = webStorage.get("orders");
                    var responseArr = data.split(",");
                    for (var i = 0; i < responseArr.length; i++) {
                        orders.push(responseArr[i]);
                    }
                    webStorage.add("orders", orders)

                }
                else {
                    alert("Произошла ошибка при добавлении заказа, пожалуйста, сообщите администратору. " + data);
                }
            })


            $scope.setTrashEmpty();
        }



    }

    $scope.sumWithoutDelivery = changeSum();
    $scope.deliveryCost = getDeliveryCost();
    $scope.sumWithDelivery = $scope.deliveryCost + $scope.sumWithoutDelivery;

    function changeSum () {
        var sum = 0;
         for (var i = 0; i < $scope.basket.length; i++) {
             sum+= $scope.basket[i].sum;
         }
        $scope.sumWithoutDelivery = sum;
        $scope.sumWithDelivery = $scope.deliveryCost + $scope.sumWithoutDelivery;
        return sum;
    }

    function getDeliveryCost() {
         var commonDeliveryPrice = 0;
        for (var i = 0; i < $scope.basket.length; i++) {
            commonDeliveryPrice+= parseInt($scope.basket[i].firm_delivery_price) || 0;
        }

        return commonDeliveryPrice;

    }

}

var commonMethods =  {
    plusCount: function (id, $scope, webStorage, isBasket) {
        ++$scope.count;

       // //console.log($scope.basket[id].count);
 /*       if (isBasket) {
            //console.log("a");
            //id = id - 1;
            //++$scope.basket[id].count;
           // id = id + 1;
        }*/





        var arr = webStorage.get("products");

        for (var i = 0; i < arr.length; i++) {

            if (arr[i]._id == id) {

                ++arr[i].count;
                arr[i].sum = arr[i].count*arr[i].price;
                webStorage.add("products", arr);
                if (isBasket) {
                    $scope.basket[i].count = arr[i].count;
                    $scope.basket[i].sum = arr[i].sum;
                }
                break;
            }
        }
    },
    minusCount: function (id, $scope, webStorage, isBasket) {
        console.log($scope.basket);
        if ($scope.count <= 1) return;
        --$scope.count;

         ////console.log($scope.product.count);

        if (isBasket) {
           // if ($scope.basket[id].count <= 1) return;
            //--$scope.basket[id].count;
            //id = id + 1;
        }

        var arr = webStorage.get("products");

        for (var i = 0; i < arr.length; i++) {
            //console.log( "id - " + id + "    arr[i].id - " + arr[i].id);
            if (arr[i]._id == id) {
                console.log(arr[i]);

                if (arr[i].count <= 1) return;
                --arr[i].count;
                arr[i].sum = arr[i].count*arr[i].price;
                webStorage.add("products", arr);

                if ($scope.basket) {
                    $scope.basket[i].count = arr[i].count;
                    $scope.basket[i].sum = arr[i].sum;
                }
            }
        }
    }    ,
    getProduct: function (id, firm_id, $scope,webStorage, department, $http) {

        

        $scope.isOrdered = "primary";
        $scope.isOrderedText = "Заказать";
        $scope.link = "";
        $scope.toBasket = $scope.toBasketFunc;
        $scope.count = 1;
       // var department = $scope.department;


        $http.get('/getProduct', { params: { pizzaFirmId: firm_id, pizzaProductId: id, depart: department  }}).
            success(function(data, status, headers, config) {
                $scope.product_detail = data;
                var arr = webStorage.get("products");
                if (arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i]._id ==  id) {
                            $scope.isOrdered = "danger";
                            $scope.isOrderedText = "В корзине";
                            $scope.toBasket = commonMethods.changeLocationBasket;
                            $scope.count = arr[i].count;
                            //console.log($scope.count);
                            break;
                        }
                        else {
                            $scope.isOrdered = "primary";
                            $scope.isOrderedText = "Заказать";
                            $scope.link = "";
                            $scope.toBasket = $scope.toBasketFunc;
                            $scope.count = 1;
                            ////console.log($scope.countda);
                        }
                    }
                }
                else {
                    $scope.toBasket = $scope.toBasketFunc;
                }
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


/*        $scope.product_detail = Brand.get({ pizzaFirmId: firm_id, pizzaProductId: id, depart: department  },function(response) {
            var arr = webStorage.get("products");
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id ==  id) {
                        $scope.isOrdered = "danger";
                        $scope.isOrderedText = "В корзине";
                        $scope.toBasket = commonMethods.changeLocationBasket;
                        $scope.count = arr[i].count;
                        //console.log($scope.count);
                        break;
                    }
                    else {
                        $scope.isOrdered = "primary";
                        $scope.isOrderedText = "Заказать";
                        $scope.link = "";
                        $scope.toBasket = $scope.toBasketFunc;
                        $scope.count = 1;
                        ////console.log($scope.countda);
                    }
                }
            }
            else {
                $scope.toBasket = $scope.toBasketFunc;
            }

        });*/

        return $scope.product_detail;
    },
    toBasketFunc : function ($scope, $rootScope, webStorage, $routeParams) {
        $rootScope.basket++;
        var arr = webStorage.get("products");
        var selectValue = $("#countValue").text(); //по умолчанию количество товара в корзине = 1

        $scope.product_detail.count = parseInt(selectValue) || 1;
        $scope.product_detail.deliveryCost = $scope.deliveryCost;
        ////console.log($routeParams.pizzaId);
        $scope.product_detail.sum = $scope.product_detail.count*$scope.product_detail.price; //по умолчанию количество товара в корзине = 1
        arr.push($scope.product_detail);
        webStorage.add("products", arr);

        $scope.isOrdered = "danger";
        $scope.isOrderedText = "В корзине";

        $rootScope.basketProductCount = webStorage.get("products").length;
        $scope.toBasket = commonMethods.changeLocationBasket;

        var countValue = $("#countValue");
    },
    changeLocationBasket: function  () {
        window.location = window.location.pathname + '#!/basket';
        $(".modal-backdrop").hide();
    },
    /*getStaticBreadcumbs: function(depart) {
        if (depart == "pizza") {
            return {
                depart: "Pizza",
                listItem: "San Jose pizza",
                product: "Margarita"
            }
        } else {
            return {
                depart: "Sushi",
                listItem: "Sumo sushi & bento",
                product: "California Rolls"
            }
        }
    }*/
}


/*


 function FirmCardCtrl($scope, Firm, $routeParams) {
 $scope.firm_detail = Firm.get({ pizzaFirmId: $routeParams.firmId });
 //console.log($scope.firm_detail);
 }



function ContactCtrl ($scope) {



    $scope.sendMessage = function () {

        var name = $scope.name;
        var phone = $scope.phone;
        var email = $scope.email;
        var message = $scope.message;

        $.post("food/pizza/contactForm.php", { message: message, email: email, phone: phone, name: name }, function (data) {
            var text;
            if (data) {
                text = '<div class="alert alert-success text-center">Сообщение успешно отправлено!</div>';
            }
            else {
                text = '<div class="alert alert-danger text-center">Произошла ошибка! Сообщение не отправлено!</div>';
            }
            $("#result").html(text);


        });

        $scope.name = "";
        $scope.phone = "";
        $scope.email = "";
        $scope.message = "";
    }


}

function AddCompanyCtrl ($scope) {



    $scope.addCompany = function () {

        var name = $scope.name;
        var snippet = $scope.snippet;
        var delivery_price = $scope.delivery_price;
        var min_price = $scope.min_price;
        var description = $scope.description;
        var department = $scope.department;
        var phone = $scope.phone;
        var email = $scope.email;

        $.post("food/pizza/addCompany.php", {

            name: name,
            snippet: snippet,
            delivery_price: delivery_price,
            min_price: min_price,
            description: description,
            department: department,
            phone: phone,
            email: email

        }, function (data) {
            var text;
            if (data) {
                text = '<div class="alert alert-success text-center">Сообщение успешно отправлено!</div>';
            }
            else {
                text = '<div class="alert alert-danger text-center">Произошла ошибка! Сообщение не отправлено!</div>';
            }
            $("#result").html(text);


        });

        $scope.name = "";
        $scope.snippet = "";
        $scope.delivery_price = "";
        $scope.min_price = "";
        $scope.description = "";
        $scope.department = "";
        $scope.phone = "";
        $scope.email = "";
    }


}

function MyOrdersCtrl (webStorage, $http, $scope) {
 var ordersInfo = webStorage.get("orders");

     $scope.orderss;

 var promise = $http.post('food/pizza/getOrders.php',{ orders: ordersInfo  }, function (data) {
 console.log(data);
 });
 promise.success(function (data) {
 console.log(data);
 $scope.orderss = data;
 })
 //webStorage.add("orders", []);
 console.log(ordersInfo);


 $http({
 url: 'food/pizza/getOrders.php',
 method: "POST",
 data: {"ordersInfo":ordersInfo},
 headers: {}
 }).success(function (data, status, headers, config) {
 console.log(data);
 $scope.orderss = data; // assign  $scope.persons here as promise is resolved here
 }).error(function (data, status, headers, config) {
 console.log("error");
 $scope.status = status;
 });

 }*/
