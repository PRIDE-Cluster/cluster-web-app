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
        scope: {
            pageNumber: "=pagenumber",
            pageSize: "=pagesize",
            totalItems: "=totalitems"
        },
//        controller: 'ClusterListPagingCtrl',
        templateUrl: 'components/directives/clusterListPaging-directive/clusterListPaging-directive.html'
    };
});

//clusterListPagingDirective.controller('ClusterListPagingCtrl', ['$scope', '$location', 'CurrentSearchState',
//    function($scope, $location, CurrentSearchState) {
//        $scope.pageNumber = CurrentSearchState.getPageNumber();
//        $scope.pageSize = CurrentSearchState.getPageSize();
//        $scope.totalItems = CurrentSearchState.getTotalResults();
//        console.log("[prcClusterListPaging-directive] Total results set to " + CurrentSearchState.getTotalResults())
//
//    }
//]);
