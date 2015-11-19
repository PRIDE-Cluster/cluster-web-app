
/* App Module + dependencies */
var prideClusterApp = angular.module('prideClusterApp', [
    'ngRoute',
    'ngAnimate',
    'nvd3ChartDirectives',
    'ui.bootstrap',
    'angular-carousel',
    'ngTable',
    //'btford.markdown',
    'hc.marked',
    'ngProgress',
    'angularSpinner',

    /* Views: thin layer containing layout+model_binding and routing elements */
    'prideClusterApp.homePageView',
    'prideClusterApp.clusterListView',
    'prideClusterApp.clusterChartView',
    'prideClusterApp.clusterDetailView',
    'prideClusterApp.spectralSearchView',
    'prideClusterApp.spectrumLibrariesView',
    'prideClusterApp.resultsView',
    'prideClusterApp.apiPageView',
    'prideClusterApp.aboutPageView',
    'prideClusterApp.helpPageView',
    'prideClusterApp.statsPageView',
    'prideClusterApp.psmView',
    'prideClusterApp.projectView',

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
    'prideClusterApp.clusterCountChartDirective',
    'prideClusterApp.clusterTutorialDirective',
    'prideClusterApp.chordPlotDirective',
    'prideClusterApp.peptideSpeciesChartDirective',
    'prideClusterApp.psmListDirective',
    'prideClusterApp.psmListPagingDirective',
    'prideClusterApp.projectListDirective',

    /* Services: singletons used to access the backend or share data between modules */
    'prideClusterApp.clusterService',
    'prideClusterApp.spectrumLibraryService',
    'prideClusterApp.statsService',
    'prideClusterApp.spectrumService',
    'prideClusterApp.resultService'
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
