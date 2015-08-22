(function () {

    angular.module('ngSharp').directive('ngUniqueIn', ['$parse', '$list', '$string', function ($parse, $list, $string) {

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {

                //var blacklist = attr.blacklist.split(',');
                var parent = $parse(attrs.ngUniqueIn)(scope);

                var startPos = attrs.ngModel.indexOf('.');
                var key = attrs.ngModel.substring(startPos + 1, attrs.ngModel.length);

                var blacklist = $list(parent).select(key);

                //For DOM -> model validation
                ctrl.$parsers.unshift(function (value) {
                    //var valid = blacklist.indexOf(value) === -1;
                    var match = $list(parent).where($string.format("{0} == '{1}'", key, value));
                    var isvalid = (match == null) || (match != null && match.length < 1);
                    ctrl.$setValidity('$isUnique', isvalid);
                    return isvalid ? value : undefined;
                });

                //For model -> DOM validation
                ctrl.$formatters.unshift(function (value) {
                    var match = $list(parent).where($string.format("{0} == '{1}'", key, value));
                    var isvalid = (match == null) || (match != null && match.length <= 1);
                    ctrl.$setValidity('$isUnique', isvalid);
                    return value;
                });

            }
        };
    }]);

})();