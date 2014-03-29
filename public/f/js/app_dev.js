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



var foodModule = angular.module('food', [ 'pizzaFilters', 'webStorageModule']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/index', {templateUrl: 'f/partials/list.html',   controller: ListCtrl}).
            when('/products/:department/', {templateUrl: 'f/partials/list.html', controller: ListCtrl}).
            when('/products/:department/:firmId', {templateUrl: 'f/partials/listitemdetail.html', controller: DetailCtrl}).
            when('/products/:department/:firmId/product_card/:pizzaId', {templateUrl: 'f/partials/productCard.html', controller: ProductCardCtrl}). //ProductCardCtrl}).
            when('/basket', {templateUrl: 'f/partials/basket.html', controller: BasketCtrl}).
            otherwise({redirectTo: '/index'});
            $locationProvider.hashPrefix('!');


         //   when('/aboutCompany/:firmId', {templateUrl: 'f/partials/firmCard.html', controller: FirmCardCtrl}). //ProductCardCtrl}).
        //    when('/contact', {templateUrl: 'f/partials/contact.html', controller: ContactCtrl}). //ProductCardCtrl}).
        //    when('/addCompany', {templateUrl: 'f/partials/addCompany.html', controller: AddCompanyCtrl}). //ProductCardCtrl}).


         //   when('/myorders', {templateUrl: 'f/partials/myorders.html', controller: MyOrdersCtrl}).

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
