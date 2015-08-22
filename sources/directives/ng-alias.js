(function () {

    angular.module('ngSharp').directive('ngAlias', ['$parse', function ($parse) {

        return {

            restrict: 'A',

            link: function (scope, element, attrs) {

                var aliases = attrs.ngAlias.split(',');

                angular.forEach(aliases, function (alias) {

                    var parts = alias.split('=');

                    var _key = parts[0].trim();
                    var _value = parts[1].trim();

                    scope.$watch(_value, function () {
                        $parse(alias)(scope);
                    });

                });
            }
        };

    }]);

})();