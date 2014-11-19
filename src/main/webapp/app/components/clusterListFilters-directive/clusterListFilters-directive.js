/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list-filters directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */

var clusterListFiltersDirective = angular.module('prideClusterApp.clusterListFiltersDirective', [])

clusterListFiltersDirective.directive('prcClusterListFilters', function() {
    return {
        restrict: 'E',
        scope: {
            sequence : '=sequence'
        },
        controller: "ClusterListFiltersCtrl",
        templateUrl: 'components/clusterListFilters-directive/clusterListFilters-directive.html'
    };
});

clusterListFiltersDirective.controller('ClusterListFiltersCtrl', ['$scope', '$location', 'CurrentSearchState',
    function($scope, $location, CurrentSearchState) {

        // set filter sequence if init value provided
        if ($scope.sequence) {
            $scope.filterSequence = $scope.sequence;
        }

        // attach filter-submit function
        $scope.filterSubmit = function() {
            // Keep the state
            CurrentSearchState.setQuery($scope.filterSequence);
            // Set location (URL)
            $location.search({q:CurrentSearchState.getQuery()});
        }

    }
]);
