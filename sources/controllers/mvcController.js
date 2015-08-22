(function () {

    angular.module('ngSharp').controller('$mvcController', ['$rootScope', '$scope', '$parse', '$state', function ($rootScope, $scope, $parse, $state) {

        $scope.$parent.resolve = function (data) {
            return $parse(data)($scope);
        }

        $scope.currentState = $state.current.name;

        $scope.submitAction = $state.current.name.replace("app.", "") + ".post(params)";

        $scope.submit = function (params) {
            $rootScope.$broadcast('$activity', { event: 'submit', params: params });
            $parse($scope.submitAction)($scope, { params: params });
        }

        $scope.do = function (action, params) {
            $rootScope.$broadcast('$activity', { event: action, params: params });
        }

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            var stateName = toState.name;

            var action = stateName.replace("app.", "");
            var _get = action + ".get(params)";

            $parse(_get)($scope, { params: toParams });

        });


    }]);

})();