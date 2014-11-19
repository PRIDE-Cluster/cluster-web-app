
/* App Module + dependencies */
var prideClusterApp = angular.module('prideClusterApp', [
    'ngRoute',
    'ngAnimate',
    'nvd3ChartDirectives',

    /* Views: thin layer containing layout+model_binding and routing elements */
    'prideClusterApp.clusterListView',
    'prideClusterApp.clusterDetailView',

    /* Directives: reusable view+controller components */
    'prideClusterApp.psmListDirective',
    'prideClusterApp.clusterListDirective',
    'prideClusterApp.clusterDetailDirective',
    'prideClusterApp.spectrumViewerDirective',
    'prideClusterApp.speciesChartDirective',
    'prideClusterApp.clusterListFiltersDirective',

    /* Services: singletons used to access the backend or share data between modules */
    'prideClusterApp.clusterService',
    'prideClusterApp.psmService',
    'prideClusterApp.appStateService'
]);

/* Default routing (not managed by any other View) */
prideClusterApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            otherwise({
                redirectTo: '/'
            });
    }
]);
