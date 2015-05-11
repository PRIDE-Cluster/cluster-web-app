
/* App Module + dependencies */
var prideClusterApp = angular.module('prideClusterApp', [
    'ngRoute',
    'ngAnimate',
    'nvd3ChartDirectives',
    'angular-carousel',
    'ngTable',

    /* Views: thin layer containing layout+model_binding and routing elements */
    'prideClusterApp.homePageView',
    'prideClusterApp.clusterListView',
    'prideClusterApp.clusterChartView',
    'prideClusterApp.clusterDetailView',
    'prideClusterApp.spectralSearchView',
    'prideClusterApp.spectrumLibrariesView',

    /* Directives: reusable view+controller components */
    'prideClusterApp.localHeaderDirective',
    'prideClusterApp.peptideViewerDirective',
    'prideClusterApp.projectViewerDirective',
    'prideClusterApp.clusterListDirective',
    'prideClusterApp.clusterChartDirective',
    'prideClusterApp.peptideSequenceViewerDirective',
    'prideClusterApp.clusterKeyDirective',
    'prideClusterApp.spectrumViewerDirective',
    'prideClusterApp.speciesChartDirective',
    'prideClusterApp.deltaMzChartDirective',
    'prideClusterApp.similarityChartDirective',
    'prideClusterApp.boxPlotDirective',
    'prideClusterApp.modificationsChartDirective',
    'prideClusterApp.viewControlsDirective',
    'prideClusterApp.clusterListPagingDirective',
    'prideClusterApp.spectralSearchDirective',
    'prideClusterApp.peptideCountChartDirective',

    /* Services: singletons used to access the backend or share data between modules */
    'prideClusterApp.clusterService',
    'prideClusterApp.psmService',
    'prideClusterApp.spectrumLibraryService',
    'prideClusterApp.projectService',
    'prideClusterApp.statsService'
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
