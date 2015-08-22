(function () {

    'use strict';

    angular.module('ngSharp').provider('$string', function () {

        return {

            $get: function () {

                return {

                    format: function () {

                        if (!arguments)
                            throw "$string.format() has no overload method that takes no parameter";

                        if (arguments.length <= 1)
                            throw "$string.format() requires at least 2 arguments";

                        var data = arguments[0];
                        var args = [].slice.call(arguments, 1, arguments.length);

                        var result = data.replace(/\{(\d)\}/g, function (value) {
                            return args[parseInt(value.substring(1, value.length - 1))];
                        });

                        return result;
                    }

                }

            }

        }
    });

})();
