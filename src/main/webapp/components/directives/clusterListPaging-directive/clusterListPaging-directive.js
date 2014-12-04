/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list-filters directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */

var clusterListPagingDirective = angular.module('prideClusterApp.clusterListPagingDirective', [])

clusterListPagingDirective.directive('prcClusterListPaging', function() {

    return {
        restrict: 'E',
//        scope: {},
        controller: 'ClusterListPagingCtrl',
        templateUrl: 'components/directives/clusterListPaging-directive/clusterListPaging-directive.html'
    };
});

clusterListPagingDirective.controller('ClusterListPagingCtrl', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {

//        $scope.pageNumber = $routeParams.page;
//        $scope.pageSize = $routeParams.size;

        function updateState() {
            $location.search({
                q:$routeParams.q,
                page:$scope.pageNumber,
                size:$scope.pageSize
            });
        }

        $scope.Math = window.Math;

        $scope.pageSizes = [10, 50, 100, 200];

        $scope.firstPage = function() {
            if ($scope.pageNumber>1) {
                $scope.pageNumber = 1;
                updateState();
            }
        };

        $scope.lastPage = function() {
            var maxPages = Math.floor($scope.totalResults / $scope.pageSize) + 1;
            if ($scope.pageNumber!=maxPages) {
                $scope.pageNumber = maxPages;
                updateState();
            }
        };

        $scope.nextPage = function() {
            var maxPages = Math.floor($scope.totalResults / $scope.pageSize) + 1;
            if ($scope.pageNumber<maxPages) {
                $scope.pageNumber++;
                updateState();
            }
        }

        $scope.previousPage = function() {
            if ($scope.pageNumber!=1) {
                $scope.pageNumber--;
                updateState();
            }
        }

        $scope.pageSizeChanged = function() {
            var newValue = $scope.pageSize;
            var oldValue = $routeParams.size;
            if (newValue && newValue!=oldValue) {
                updateState();
            }
        };

    }
]);
