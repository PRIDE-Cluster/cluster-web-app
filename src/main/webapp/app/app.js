
/* App Module */
var prideClusterApp = angular.module('prideClusterApp', [
    'ngRoute',
    'prideClusterApp.cluster-list',
    'prideClusterApp.cluster-detail'
]);

prideClusterApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            otherwise({
                redirectTo: '/list'
            });
    }
]);
