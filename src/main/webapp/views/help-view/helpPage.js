/**
 * @author Rui Wang <rwang@ebi.ac.uk>
 *
 */
var helpPageView = angular.module('prideClusterApp.helpPageView', ['ngRoute']);

helpPageView.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/help', {
            templateUrl: 'views/help-view/faqPage.html',
            controller: 'HelpPageViewCtrl'
        });

        $routeProvider.when('/help/faq', {
            templateUrl: 'views/help-view/faqPage.html',
            controller: 'HelpPageViewCtrl'
        });

        $routeProvider.when('/help/pipeline', {
            templateUrl: 'views/help-view/pipelinePage.html',
            controller: 'HelpPageViewCtrl'
        });

        $routeProvider.when('/help/cluster', {
            templateUrl: 'views/help-view/clusterDetailPage.html',
            controller: 'HelpPageViewCtrl'
        });

        $routeProvider.when('/help/peptide', {
            templateUrl: 'views/help-view/peptidePage.html',
            controller: 'HelpPageViewCtrl'
        });
    }
]);

helpPageView.controller('AboutPageViewCtrl', function($scope, $location, $anchorScroll) {
    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    }
});