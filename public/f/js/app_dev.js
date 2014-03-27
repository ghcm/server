'use strict';

(function() {

    angular.extend( angular, {
        toParam: toParam
    });

    /**
     * ����������� ������, ������ ��� ������ �������� � ������,
     * ������� ������������� ������� �������� ������ ����� url
     * ����� ���������� [url]http://api.jquery.com/jQuery.param/[/url]
     * �������� [url]http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object/1714899#1714899[/url]
     *
     * @param object
     * @param [prefix]
     * @returns {string}
     */
    function toParam( object, prefix ) {
        var stack = [];
        var value;
        var key;

        for( key in object ) {
            value = object[ key ];
            key = prefix ? prefix + '[' + key + ']' : key;

            if ( value === null ) {
                value = encodeURIComponent( key ) + '=';
            } else if ( typeof( value ) !== 'object' ) {
                value = encodeURIComponent( key ) + '=' + encodeURIComponent( value );
            } else {
                value = toParam( value, key );
            }

            stack.push( value );
        }

        return stack.join( '&' );
    }

}());


// Declare app level module which depends on filters, and services
/*angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
 config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/index', {templateUrl: 'partials/index_partial.html', controller: 'indexCtrl'});
 // $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
 $routeProvider.otherwise({redirectTo: '/index'});
 }]);*/


var foodModule = angular.module('food', [ 'pizzaFilters', 'pizzaServices', 'sushiServices', 'webStorageModule', 'commonServices','seo']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/index', {templateUrl: 'f/partials/pizzafirms.html',   controller: PizzaListCtrl}).
            when('/products/:department/', {templateUrl: 'f/partials/pizzafirms.html', controller: PizzaListCtrl}).
            when('/products/:department/:firmId', {templateUrl: 'f/partials/pizzafirmdetail.html', controller: PizzaDetailCtrl}).
            when('/products/:department/:firmId/product_card/:pizzaId', {templateUrl: 'f/partials/productCard.html', controller: ProductCardCtrl}). //ProductCardCtrl}).
            when('/aboutCompany/:firmId', {templateUrl: 'f/partials/firmCard.html', controller: FirmCardCtrl}). //ProductCardCtrl}).
            when('/contact', {templateUrl: 'f/partials/contact.html', controller: ContactCtrl}). //ProductCardCtrl}).
            when('/addCompany', {templateUrl: 'f/partials/addCompany.html', controller: AddCompanyCtrl}). //ProductCardCtrl}).
            // when('/sushi/:sushiId', {templateUrl: 'partials/sushifirmdetail.html', controller: SushiDetailCtrl}).
            //when('/sushi/product/:sushi_product_Id', {templateUrl: 'partials/sushi_product_detail.html', controller: SushiProductDetailCtrl}).
            // when('/sushi', {templateUrl: 'partials/sushifirms.html', controller: SushiListCtrl}).
            when('/basket', {templateUrl: 'f/partials/basket.html', controller: BasketCtrl}).
            when('/myorders', {templateUrl: 'f/partials/myorders.html', controller: MyOrdersCtrl}).
            otherwise({redirectTo: '/index'});
            $locationProvider.hashPrefix('!');
    }]);

foodModule

    .config( function( $httpProvider ) {    // [url]http://habrahabr.ru/post/181009/[/url]
        $httpProvider.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.transformRequest = function( data ) {
            return angular.isObject( data ) && String( data ) !== '[object File]' ? angular.toParam( data ) : data;
        };
    });

/* GLOBAL VARIABLES */
foodModule.run(function ($rootScope, webStorage, $templateCache) {
    var a = webStorage.get("products");
    var b = webStorage.get("user");
    var c = webStorage.get("orders");
    //console.log(a);
    if (!a) webStorage.add("products", []);
    if (!b) webStorage.add("user", []);
    if (!c) webStorage.add("orders", []);

    $rootScope.$watch('webStorage.get("products")', calculateTotals, true);

    function calculateTotals  () {
        $rootScope.basketProductCount = webStorage.get("products").length;
        //console.log(webStorage.get("products").length);
    }
});
