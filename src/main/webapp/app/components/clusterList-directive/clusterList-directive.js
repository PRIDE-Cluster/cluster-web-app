/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list directive allows us to reuse a list of cluster everywhere we want to show it (e.g.
 * in the clusterList-view)
 *
 */

var clusterListDirective = angular.module('prideClusterApp.clusterListDirective', [])

clusterListDirective.directive('prcClusterList', ['ClusterSummary', function(ClusterSummary) {
    function link(scope, element, attrs) {
        console.log("[link] - queryTerm is " + scope.queryTerm);
        console.log("[link] - pageNumber is " + scope.pageNumber);
        console.log("[link] - pageSize is " + scope.pageSize);
        scope.clusters = ClusterSummary.list(
            { queryTerm:scope.queryTerm, pageNumber:scope.pageNumber, pageSize:scope.pageSize },
            function(clusters) {}
        );
    }
    return {
        restrict: 'E',
        scope: {
            queryTerm: '=query',
            pageNumber: '=page',
            pageSize: '=size'
        },
//        controller: 'ClusterListDirectiveCtrl',
        link: link,
        templateUrl: 'app/components/clusterList-directive/clusterList-directive.html'
    };
}]);

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the cluster list directive controller accesses the ClusterSummary end point to get lists of
 * Cluster summaries.
 *
 * The list of clusters is assigned to a model object in order to be accessed later on within the html template
 * part of the directive.
 *
 * Other model objects include sortField and reverse, used to sort the cluster list
 *
 */
clusterListDirective.controller('ClusterListDirectiveCtrl', ['$scope', 'ClusterSummary',
    function($scope, ClusterSummary) {
        console.log("[ClusterListDirectiveCtrl] - queryTerm is " + $scope.queryTerm)
        console.log("[ClusterListDirectiveCtrl] - pageNumber is " + $scope.pageNumber)
        console.log("[ClusterListDirectiveCtrl] - pageSize is " + $scope.pageSize)
        $scope.clusters = ClusterSummary.list({q:$scope.queryTerm, page:$scope.pageNumber, size:$scope.pageSize}, function(clusters) {

        });
    }
]);
