
/* App Module + dependencies */
var prideClusterApp = angular.module('prideClusterApp', [
    'ngRoute',
    'ngAnimate',
    'nvd3ChartDirectives',
    'ui.bootstrap',

    /* Views: thin layer containing layout+model_binding and routing elements */
    'prideClusterApp.clusterListView',
    'prideClusterApp.clusterChartView',
    'prideClusterApp.clusterDetailView',

    /* Directives: reusable view+controller components */
    'prideClusterApp.localHeaderDirective',
    'prideClusterApp.psmListDirective',
    'prideClusterApp.clusterListDirective',
    'prideClusterApp.clusterChartDirective',
    'prideClusterApp.clusterDetailDirective',
    'prideClusterApp.spectrumViewerDirective',
    'prideClusterApp.speciesChartDirective',
    'prideClusterApp.clusterListFiltersDirective',
    'prideClusterApp.clusterListPagingDirective',

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
                redirectTo: "/"

            });
    }
]);