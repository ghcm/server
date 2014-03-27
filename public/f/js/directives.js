'use strict';

/* Directives */


foodModule
      .directive('myModal',  function() {
            return {
                restrict: "E",
                replace: true,
                transclude: true,
                templateUrl: "partials/modalWrapper.html"
            }
      });

