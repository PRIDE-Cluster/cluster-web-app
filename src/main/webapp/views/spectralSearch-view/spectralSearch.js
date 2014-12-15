/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Each view must define its own routing and Controllers.
 */
var spectralSearchView = angular.module('prideClusterApp.spectralSearchView', ['ngRoute'])

/**
 * Through routing we associate html templates with behaviour.
 * In this case the spectralSearchView.html template is associated with the SpectralSearchController when the app
 * navigates to the search interface
 */
spectralSearchView.config(
    function($routeProvider) {
        $routeProvider.when('/spectral', {
            templateUrl: 'views/spectralSearch-view/spectralSearch.html',
            controller: 'SpectralSearchViewCtrl'
        });
    }
);

/**
 * This controller is injected with scope. Right now is not really needed...
 */
spectralSearchView.controller('SpectralSearchViewCtrl', ['$scope',
    function($scope) {

    }
]);

