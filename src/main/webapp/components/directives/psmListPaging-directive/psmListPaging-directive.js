/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list-filters directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */

var psmListPagingDirective = angular.module('prideClusterApp.psmListPagingDirective', []);

psmListPagingDirective.directive('prcPsmListPaging', function () {

    return {
        restrict: 'E',
        scope: {
            totalResults: '='
        },
        controller: 'PSMListPagingCtrl',
        templateUrl: 'components/directives/psmListPaging-directive/psmListPaging-directive.html'
    };
});

psmListPagingDirective.controller('PSMListPagingCtrl', ['$scope', '$routeParams', '$location',
    function ($scope, $routeParams, $location) {

        $scope.sequence = $routeParams.sequence;
        $scope.pageNumber = $routeParams.pageNumber;
        $scope.pageSize = $routeParams.pageSize;
        $scope.modFilters = $routeParams.modFilters;
        $scope.projectFilters = $routeParams.projectFilters;

        function updateState() {
            $location.search({
                sequence: $routeParams.sequence,
                modFilters: $routeParams.modFilters,
                projectFilters: $routeParams.projectFilters,
                pageNumber: $scope.pageNumber,
                pageSize: $scope.pageSize
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
            var oldValue = $routeParams.pageSize;
            if (newValue && newValue != oldValue) {
                $scope.pageNumber = 1;
                updateState();
            }
        };

    }
]);
