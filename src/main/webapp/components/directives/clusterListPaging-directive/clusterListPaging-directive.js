/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list-filters directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */

var clusterListPagingDirective = angular.module('prideClusterApp.clusterListPagingDirective', [])

clusterListPagingDirective.directive('prcClusterListPaging', ['CurrentSearchState', function(CurrentSearchState) {

    return {
        restrict: 'E',
        controller: 'ClusterListPagingCtrl',
        templateUrl: 'components/directives/clusterListPaging-directive/clusterListPaging-directive.html'
    };
}]);

clusterListPagingDirective.controller('ClusterListPagingCtrl', ['$scope', '$location', 'CurrentSearchState',
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

        $scope.Math = window.Math;

        $scope.pageSizes = [10, 50, 100, 200];

        $scope.firstPage = function() {
            if ($scope.pageNumber>1) {
                $scope.pageNumber = 1;
                // Keep the state change
                CurrentSearchState.setPageNumber($scope.pageNumber);
                updateState();
            }
        };

        $scope.lastPage = function() {
            var maxPages = Math.floor($scope.totalItems / $scope.pageSize) + 1;
            if ($scope.pageNumber!=maxPages) {
                $scope.pageNumber = maxPages;
                // Keep the state change
                CurrentSearchState.setPageNumber($scope.pageNumber);
                updateState();
            }
        };

        $scope.nextPage = function() {
            var maxPages = Math.floor($scope.totalItems / $scope.pageSize) + 1;
            if ($scope.pageNumber<maxPages) {
                $scope.pageNumber++;
                // Keep the state change
                CurrentSearchState.setPageNumber($scope.pageNumber);
                updateState();
            }
        }

        $scope.previousPage = function() {
            if ($scope.pageNumber!=1) {
                $scope.pageNumber--;
                // Keep the state change
                CurrentSearchState.setPageNumber($scope.pageNumber);
                updateState();
            }
        }

        $scope.pageSizeChanged = function() {
            var newValue = $scope.pageSize;
            var oldValue = CurrentSearchState.getPageSize();
            if (newValue && newValue!=oldValue) {
                if (newValue>10 && newValue<=200) {
                    CurrentSearchState.setPageSize(newValue);
                }
                updateState();
            }
        };

    }
]);
