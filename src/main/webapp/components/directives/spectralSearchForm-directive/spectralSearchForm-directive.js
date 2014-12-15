/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-spectral-search-form directive allows us to reuse a search form
 *
 */

var spectralSearchFormDirective = angular.module('prideClusterApp.spectralSearchFormDirective', [])

spectralSearchFormDirective.directive('prcSpectralSearchForm', function() {
    return {
        restrict: 'E',
        scope: {  },
        controller: 'SpectralSearchFormDirectiveCtrl',
        templateUrl: 'components/directives/spectralSearchForm-directive/spectralSearchForm-directive.html'
    };
});

/**
 *
 */
spectralSearchFormDirective.controller('SpectralSearchFormDirectiveCtrl', ['$scope', 'ClusterSummary',
    function($scope, ClusterSummary) {

    }
]);
