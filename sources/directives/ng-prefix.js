(function () {

    angular.module('ngSharp').directive('ngPrefix', [function () {

        return {

            restrict: 'A',
            require: 'ngModel',

            link: function (scope, element, attrs, controller) {

                var expr = attrs.ngPrefix;

                function ensurePrefix(value) {
                    // Need to add prefix if we don't have +234 prefix already AND we don't have part of it
                    if (value) {
                        value = value.replace(/^0+/, '');
                        ////console.log('index', value.indexOf(attrs.ngPrefix));
                        if (value && value.indexOf(attrs.ngPrefix) != 0) {
                            controller.$setViewValue(attrs.ngPrefix + value);
                            controller.$render();
                            return attrs.ngPrefix + value;
                        }
                        else {
                            return value;
                        }
                    }

                }

                controller.$formatters.push(ensurePrefix);
                controller.$parsers.push(ensurePrefix);

            }
        };
    }]);

})();