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
//            pageNumber: CurrentSearchState.getPageNumber(),
            pageSize: "=pagesize",
            totalItems: "=totalitems"
        },
        controller: 'ClusterListPagingCtrl',
        templateUrl: 'components/directives/clusterListPaging-directive/clusterListPaging-directive.html'
    };
}]);

clusterListPagingDirective.controller('ClusterListPagingCtrl', ['$scope', '$location', 'CurrentSearchState',
    function($scope, $location, CurrentSearchState) {
        console.log("[ClusterListPagingCtrl] controlling...")
//        if (!$scope.pageNumber) {
//            $scope.pageNumber = 5; //CurrentSearchState.getPageNumber();
//        }
//        console.log("[ClusterListPagingCtrl] page is " + $scope.pageNumber);
//        $scope.pageChanged = function() {
//            console.log('Page changed to: ' + $scope.pageNumber);
////            CurrentSearchState.setPageNumber($scope.pageNumber);
//            $location.search({page:$scope.pageNumber});
//        };

        $scope.selectPage = function(page) {
            console.log('Page changed to: ' + page);
//            CurrentSearchState.setPageNumber($scope.pageNumber);
            $location.search({page:page});
        };
    }
]);
