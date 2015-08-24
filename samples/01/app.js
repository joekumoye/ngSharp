(function () {

    var sample = angular.module('sample', ["ngAnimate", "ui.router", "ngSharp"]);

    sample.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


        $urlRouterProvider.otherwise('/');

        $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'views/home/index.html',
            controller: 'homeController',
            access: 'public'
        })

        .state('admin', {
            url: '/admin',
            templateUrl: 'views/admin/_layout.html',
            controller: function ($scope) { },
            access: 'public'
        })
            .state('admin.index', {
                url: '/',
                templateUrl: 'views/admin/index.html',
                controller: 'adminController',
                access: 'public'
            })
            .state('admin.profile', {
                url: '/profile',
                templateUrl: 'views/admin/profile.html',
                controller: 'adminController',
                access: 'public'
            })
            .state('admin.users', {
                url: '/users',
                templateUrl: 'views/admin/users/_layout.html',
                controller: function ($scope) { },
                access: 'public'
            })
                .state('admin.users.index', {
                    url: '/',
                    templateUrl: 'views/admin/users/index.html',
                    controller: 'adminController',
                    access: 'public'
                })
                .state('admin.users.new', {
                    url: '/new',
                    templateUrl: 'views/admin/users/new.html',
                    controller: 'adminController',
                    access: 'public'
                })
                .state('admin.users.edit', {
                    url: '/edit',
                    templateUrl: 'views/admin/users/edit.html',
                    controller: 'adminController',
                    access: 'public'
                })

        .state('contacts', {
            url: '/contacts',
            templateUrl: 'views/admin/index',
            controller: 'contactsController',
            access: 'public'
        })

    }]);

    sample.run(['$rootScope', '$state', function ($rootScope, $state) {


    }]);

})();