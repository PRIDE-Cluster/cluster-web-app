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
        scope: {
            pageNumberInit: "=pagenumber",
            pageSizeInit: "=pagesize",
            totalItems: "=totalitems"
        },
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

        // set init values if provided
        if ($scope.pageNumberInit) {
            $scope.pageNumber = $scope.pageNumberInit;
        }
        if ($scope.pageSizeInit) {
            $scope.pageSize = $scope.pageSizeInit;
        }

        $scope.pageNumberChanged = function() {
            var maxPages = Math.floor($scope.totalItems / $scope.pageSize);
            var newValue = $scope.pageNumber;
            var oldValue = CurrentSearchState.getPageNumber();
            if (newValue && newValue!=oldValue) {
                if (newValue>0 && newValue<=maxPages) {
                    CurrentSearchState.setPageNumber(newValue);
                }
                updateState();
            }
        };

        $scope.pageSizeChanged = function() {
            var newValue = $scope.pageSize;
            var oldValue = CurrentSearchState.getPageSize();
            if (newValue && newValue!=oldValue) {
                if (newValue>10 && newValue<=100) {
                    CurrentSearchState.setPageSize(newValue);
                }
                updateState();
            }
        };

        // attach filter-submit function
        $scope.nextPage = function() {
            var maxPages = Math.floor($scope.totalItems / $scope.pageSize);
            if ($scope.pageNumber<maxPages) {
                $scope.pageNumber++;
                // Keep the state change
                CurrentSearchState.setPageNumber($scope.pageNumber);
                updateState();
            }
        }

        $scope.previousPage = function() {
            if ($scope.pageNumber>1) {
                $scope.pageNumber--;
                // Keep the state change
                CurrentSearchState.setPageNumber($scope.pageNumber);
                updateState();
            }
        }
    }
]);
