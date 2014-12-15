/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-spectral-search-form directive allows us to reuse a search form
 *
 */

var spectralSearchDirective = angular.module('prideClusterApp.spectralSearchDirective', [])

spectralSearchDirective.directive('prcSpectralSearch', function() {
    return {
        restrict: 'E',
        scope: {  },
        controller: 'SpectralSearchDirectiveCtrl',
        templateUrl: 'components/directives/spectralSearch-directive/spectralSearch-directive.html'
    };
});

/**
 *
 */
spectralSearchDirective.controller('SpectralSearchDirectiveCtrl', ['$scope', 'ClusterSummary',
    function($scope, ClusterSummary) {

        $scope.reset = function(searchForm) {
            if (searchForm) {
                searchForm.$setPristine();
                searchForm.$setUntouched();
            }
        };

        $scope.search = function(spectrum) {
            ClusterSummary.nearest(
                {
                    precursor:spectrum.precursorMz,
                    peaks:spectrum.peaks
                },
                function(clusters) {
                    console.log("hey");
                    $scope.clusterId = clusters.results[1].id;
                    console.log($scope.clusterId);
                }
            );
        }
    }
]);
