angular.module("coreUI", [])
  .directive('dirEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
                scope.$apply(function (){
                    scope.$eval(attrs.dirEnter);
                });

                event.preventDefault();
        });
    };
});
