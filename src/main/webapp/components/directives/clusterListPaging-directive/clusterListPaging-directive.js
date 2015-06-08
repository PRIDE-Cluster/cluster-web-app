/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list-filters directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */

var clusterListPagingDirective = angular.module('prideClusterApp.clusterListPagingDirective', []);

clusterListPagingDirective.directive('prcClusterListPaging', function () {

    return {
        restrict: 'E',
        scope: {
            totalResults: '='
        },
        controller: 'ClusterListPagingCtrl',
        templateUrl: 'components/directives/clusterListPaging-directive/clusterListPaging-directive.html'
    };
});

clusterListPagingDirective.controller('ClusterListPagingCtrl', ['$scope', '$routeParams', '$location',
    function ($scope, $routeParams, $location) {

        $scope.query = $routeParams.q;
        $scope.pageNumber = $routeParams.page;
        $scope.pageSize = $routeParams.size;
        $scope.modFilters = $routeParams.modFilters;
        $scope.speciesFilters = $routeParams.speciesFilters;
        $scope.sortFiled = $routeParams.sortField;
        $scope.sortOrder = $routeParams.sortOrder;

        function updateState() {
            $location.search({
                q: $routeParams.q,
                page: $scope.pageNumber,
                size: $scope.pageSize,
                modFilters: $routeParams.modFilters,
                speciesFilters: $routeParams.speciesFilters,
                sortField: $routeParams.sortField,
                sortOrder: $routeParams.sortOrder
            });
        }

        $scope.Math = window.Math;

        function calcMaxNumOfPages() {
            return Math.ceil($scope.totalResults / $scope.pageSize);
        }

        $scope.pageSizes = [20, 50, 100, 200];

        $scope.isSelected = function(page) {
            return $scope.pageNumber === page;
        };

        $scope.setPage = function (page) {
            if ($scope.pageNumber !== page) {
                $scope.pageNumber = page;
                updateState();
            }
        };

        $scope.isFirstPages = function() {
            return parseInt($scope.pageNumber) - 2 <= 2;
        };

        $scope.firstPage = function () {
            if ($scope.pageNumber > 1) {
                $scope.pageNumber = 1;
                updateState();
            }
        };

        $scope.isLastPages = function() {
            return $scope.pageNumber + 2 >= calcMaxNumOfPages() - 1;
        };

        $scope.lastPage = function () {
            var maxPages = calcMaxNumOfPages();
            if ($scope.pageNumber != maxPages) {
                $scope.pageNumber = maxPages;
                updateState();
            }
        };

        $scope.getMaxPages = function () {
            return calcMaxNumOfPages();
        };

        $scope.getPages = function () {
            var maxPages = calcMaxNumOfPages();
            if (maxPages === 1) {
                return [];
            }

            var initPage = parseInt($scope.pageNumber);
            if (initPage === 1) {
                initPage++;
            }

            if (initPage === maxPages) {
                initPage--;
            }

            var left = initPage;
            var right = initPage;

            var pageNumbers = [];

            // push the current page number to the array
            if (initPage !== 1) {
                pageNumbers.push(initPage);
            }

            // left
            for (i = 0; i < 2; i++) {
                left--;
                if (left > 1) {
                    pageNumbers.unshift(left);
                } else {
                    right++;
                    if (right < maxPages) {
                        pageNumbers.push(right);
                    }
                }
            }

            // right
            for (i = 0; i < 2; i++) {
                right++;
                if (right < maxPages) {
                    pageNumbers.push(right);
                } else {
                    left--;
                    if (left > 1) {
                        pageNumbers.unshift(left);
                    }
                }
            }

            return pageNumbers;
        };

        $scope.pageSizeChanged = function () {
            var newValue = $scope.pageSize;
            var oldValue = $routeParams.size;
            if (newValue && newValue != oldValue) {
                $scope.pageNumber = 1;
                updateState();
            }
        };

    }
]);
