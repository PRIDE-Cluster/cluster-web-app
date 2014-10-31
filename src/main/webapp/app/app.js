
/* App Module */
var prideClusterApp = angular.module('prideClusterApp', [
    'ngRoute',
    'prideClusterApp.clusterListView',
    'prideClusterApp.clusterDetailView',
    'prideClusterApp.clusterService'
]);

prideClusterApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            otherwise({
                redirectTo: '/list'
            });
    }
]);
