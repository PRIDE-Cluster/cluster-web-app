
/* App Module */
var prideClusterApp = angular.module('prideClusterApp', [
    'ngRoute',
    'prideClusterApp.clusterListView',
    'prideClusterApp.clusterDetailView',
    'prideClusterApp.clusterService'
]);

/* Default routing (not managed by any other View controller) */
prideClusterApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            otherwise({
                redirectTo: '/list'
            });
    }
]);
