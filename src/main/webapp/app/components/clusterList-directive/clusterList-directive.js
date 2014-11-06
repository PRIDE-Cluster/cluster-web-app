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
        link: link,
        templateUrl: 'app/components/clusterList-directive/clusterList-directive.html'
    };
}]);

