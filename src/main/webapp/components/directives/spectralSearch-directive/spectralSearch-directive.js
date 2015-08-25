/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-spectral-search-form directive allows us to reuse a search form
 *
 */

var spectralSearchDirective = angular.module('prideClusterApp.spectralSearchDirective', []);

spectralSearchDirective.directive('prcSpectralSearch', function() {
    return {
        restrict: 'E',
        controller: 'SpectralSearchDirectiveCtrl',
        templateUrl: 'components/directives/spectralSearch-directive/spectralSearch-directive.html'
    };
});

/**
 *
 */
spectralSearchDirective.controller('SpectralSearchDirectiveCtrl', ['$scope', 'ClusterSummary',
    function($scope, ClusterSummary) {


        $scope.search = function(spectrum) {
            ClusterSummary.nearest(
                {
                    page:0,
                    size:1500,
                    precursor:spectrum.precursorMz,
                    peaks:spectrum.peaks
                },
                function(clusters) {
//                    console.log("Total results is " + clusters.totalResults);
                    $scope.clusterSequence = clusters.results[0].sequence;
                    $scope.clusterId = clusters.results[0].id;
                    $scope.setSource(clusters.results[0].id, true);

                    for (i=0; i<1500; i++) {
//                        console.log("["+i+"] " + clusters.results[i].id);
                    }
                }
            );
        }
    }
]);
