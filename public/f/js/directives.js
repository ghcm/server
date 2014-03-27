'use strict';

/* Directives */


foodModule
      .directive('myModal',  function() {
            return {
                restrict: "E",
                replace: true,
                transclude: true,
                templateUrl: "f/partials/modalWrapper.html"
            }
      });

