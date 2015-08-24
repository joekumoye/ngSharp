(function () {

    angular.module('sample').controller('adminController', ['$rootScope', '$scope', '$controller', '$state', '$filter', function ($rootScope, $scope, $controller, $state, $filter) {
        //inherit from baseController
        angular.extend(this, $controller('$mvcController', { $scope: $scope }));

        $scope.admin = {

            index: {
                
                get: function (params) {

                    $scope.title = "Admin - Index";

                },

                post: function (model) {

                }

            },

            users: {

                index: {

                    get: function (params) {

                        $scope.title = "Admin - Users - Index";

                    },

                    post: function (model) {

                    }

                },

                new: {

                    get: function (params) {

                        $scope.title = "Admin - Users - New";
                        $scope.model = {};

                    },

                    post: function (model) {

                        alert('you submitted ' + $filter('json')(model));
                    }

                },

                edit: {

                    get: function (params) {

                        $scope.title = "Admin - Users - Edit";

                    },

                    post: function (model) {

                    }

                }

            }

        }

    }]);

})();