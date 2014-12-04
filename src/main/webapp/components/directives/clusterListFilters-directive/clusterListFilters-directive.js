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

        },
        controller: "ClusterListFiltersCtrl",
        templateUrl: 'components/directives/clusterListFilters-directive/clusterListFilters-directive.html'
    };
});

clusterListFiltersDirective.controller('ClusterListFiltersCtrl', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {

        function updateState(view) {
            // Set location (URL)
            $location.path(view);
            $location.search({
                q:$routeParams.q,
                page:$routeParams.page,
                size:$routeParams.size
            });
        }

        // attach filter-submit function
        $scope.listSubmit = function() {
            updateState("/");
        }

        $scope.chartSubmit = function() {
            updateState("/chart");
        }

    }
]);


