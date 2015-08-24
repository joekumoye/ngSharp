(function () {

    angular.module('sample').controller('homeController', ['$rootScope', '$scope', '$controller', '$state', function ($rootScope, $scope, $controller, $state) {
        //inherit from baseController
        angular.extend(this, $controller('$mvcController', { $scope: $scope }));

        $scope.home = {

            get: function (params) {

                $scope.title = "Sample HomePage";

            },

            post: function (model) {

            }

        }
        
    }]);

})();