
/* App Module + dependencies */
var prideClusterApp = angular.module('prideClusterApp', [
    'ngRoute',

    /* Views: thin layer containing layout+model_binding and routing elements */
    'prideClusterApp.clusterListView',
    'prideClusterApp.clusterDetailView',

    /* Directive: reusable view+controller components */
    'prideClusterApp.clusterListDirective',
    'prideClusterApp.clusterDetailDirective',

    /* Services: singletons used to access the backend or share data between modules */
    'prideClusterApp.clusterService'
]);

/* Default routing (not managed by any other View) */
prideClusterApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            otherwise({
                redirectTo: '/list'
            });
    }
]);
