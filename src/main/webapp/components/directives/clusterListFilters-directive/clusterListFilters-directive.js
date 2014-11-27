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
        templateUrl: 'components/directives/clusterListFilters-directive/clusterListFilters-directive.html'
    };
});

clusterListFiltersDirective.controller('ClusterListFiltersCtrl', ['$scope', '$location', 'CurrentSearchState',
    function($scope, $location, CurrentSearchState) {

        function updateState() {
            // Set location (URL)
            $location.path(CurrentSearchState.getViewPath());
            $location.search({
                q:CurrentSearchState.getQuery(),
                page:CurrentSearchState.getPageNumber(),
                size:CurrentSearchState.getPageSize()
            });
        }

        // set filter sequence if init value provided
        if ($scope.sequence) {
            $scope.sequenceFilter = $scope.sequence;
        }

        $scope.totalResults = CurrentSearchState.getTotalResults();

        // attach filter-submit function
        $scope.listSubmit = function() {
            // Keep the state change
            CurrentSearchState.setViewPath("/");
            updateState();
        }

        $scope.chartSubmit = function() {
            // Keep the state change
            CurrentSearchState.setViewPath("/chart");
            updateState();
        }

    }
]);


