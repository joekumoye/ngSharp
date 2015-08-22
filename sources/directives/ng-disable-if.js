(function () {

    angular.module('ngSharp').directive('ngDisableIf', function () {
        return function (scope, element, attrs) {

            scope.startWatching = function (model) {
                ////console.log('model to watch', model);
                scope.$statusWatch = scope.$watch(model, function (newVal, oldVal) {
                    ////console.log('watchvalue', String(newVal));
                    ////console.log('ngdisableif', String(attrs.ngDisableIf));
                    attrs.$set('disabled', (String(newVal) == String(attrs.ngDisableIf)) ? 'disabled' : undefined);
                }, false);
            }

            scope.stopWatching = function () {
                scope.$statusWatch();
            }

            //we require ng-watch-on
            scope.$watch(attrs.ngWatchOn, function (newVal, oldVal) {
                ////console.log('watcher', newVal);
                if (scope.$statusWatch) {
                    ////console.log('watcher exists');
                    scope.stopWatching();
                }
                ////console.log('value to watch', newVal);
                scope.startWatching(newVal);
            }, false);

        }
    });

})();