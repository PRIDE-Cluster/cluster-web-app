/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list directive allows us to reuse a list of cluster everywhere we want to show it (e.g.
 * in the clusterList-view)
 *
 */

var clusterListDirective = angular.module('prideClusterApp.clusterListDirective', [])

clusterListDirective.directive('prcClusterList', ['ClusterSummary', 'CurrentSearchState', function(ClusterSummary, CurrentSearchState) {
    return {
        restrict: 'E',
        scope: {
            queryTerm: '=query',
            pageNumber: '=page',
            pageSize: '=size'
        },
        controller: 'ClusterListDirectiveCtrl',
        templateUrl: 'components/directives/clusterList-directive/clusterList-directive.html'
    };
}]);


clusterListDirective.controller('ClusterListDirectiveCtrl', ['$scope', 'ClusterSummary', 'CurrentSearchState',
    function($scope, ClusterSummary, CurrentSearchState) {

        ClusterSummary.list(
            { queryTerm:$scope.queryTerm, pageNumber:$scope.pageNumber, pageSize:$scope.pageSize },
            function(clusters) {
                $scope.clusters = clusters.results;
                CurrentSearchState.setTotalResults(clusters.totalResults);
                console.log("[prcClusterList-directive] Total results set to " + CurrentSearchState.getTotalResults())
                $scope.totalResults = CurrentSearchState.getTotalResults();
                $scope.query = CurrentSearchState.getQuery();
                $scope.totalItems = CurrentSearchState.getTotalResults();
                $scope.pageNumber = CurrentSearchState.getPageNumber();
                $scope.pageSize = CurrentSearchState.getPageSize();
            }
        );
    }
]);