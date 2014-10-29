
/* App Module */
var prideClusterApp = angular.module('prideClusterApp', [
    'ngRoute',
    'prideClusterControllers'
]);

prideClusterApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/cluster/list', {
                templateUrl: 'app/cluster-list/cluster-list.html',
                controller: 'ClusterListCtrl'
            }).
            when('/cluster/:clusterId', {
                templateUrl: 'app/cluster-detail/cluster-detail.html',
                controller: 'ClusterDetailCtrl'
            }).
            otherwise({
                redirectTo: '/cluster/list'
            });
    }
]);
