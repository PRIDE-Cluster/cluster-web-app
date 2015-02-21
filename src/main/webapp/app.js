
/* App Module + dependencies */
var prideClusterApp = angular.module('prideClusterApp', [
    'ngRoute',
    'ngAnimate',
    'nvd3ChartDirectives',
    'ui.bootstrap',

    /* Views: thin layer containing layout+model_binding and routing elements */
    'prideClusterApp.homePageView',
    'prideClusterApp.clusterListView',
    'prideClusterApp.clusterChartView',
    'prideClusterApp.clusterDetailView',
    'prideClusterApp.spectralSearchView',
    'prideClusterApp.spectralLibrariesView',

    /* Directives: reusable view+controller components */
    'prideClusterApp.localHeaderDirective',
    'prideClusterApp.psmListDirective',
    'prideClusterApp.clusterListDirective',
    'prideClusterApp.clusterChartDirective',
    'prideClusterApp.clusterKeyDirective',
    'prideClusterApp.spectrumViewerDirective',
    'prideClusterApp.speciesChartDirective',
    'prideClusterApp.ptmsChartDirective',
    'prideClusterApp.clusterListFiltersDirective',
    'prideClusterApp.clusterListPagingDirective',
    'prideClusterApp.spectralSearchDirective',

    /* Services: singletons used to access the backend or share data between modules */
    'prideClusterApp.clusterService',
    'prideClusterApp.psmService'
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
