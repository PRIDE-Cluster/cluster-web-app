/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-detail directive allows us to reuse a cluster detail data element everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var clusterDetailDirective = angular.module('prideClusterApp.clusterDetailDirective', [])

clusterDetailDirective.directive('prcClusterDetail', function() {
    return {
        restrict: 'E',
        scope: { clusterId : '=clusterid' },
        controller: 'ClusterDetailDirectiveCtrl',
        templateUrl: 'components/clusterDetail-directive/clusterDetail-directive.html'
    };
});

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the cluster detail controller accesses the ClusterDetail end point to get details of
 * individual Clusters. These details are assigned to model objects in order to be accessed later on
 * within the html template part of the view.
 */
clusterDetailDirective.controller('ClusterDetailDirectiveCtrl', ['$scope', 'ClusterDetail',
    function($scope, ClusterDetail) {
        var maxRatio;
        $scope.cluster = ClusterDetail.get({clusterId: $scope.clusterId}, function(cluster) {
            $scope.maxRatioData = {
                "title": "",
                "subtitle": "",
                "ranges": [0.0, 0.5, 1.0],
                "measures": [cluster.maxRatio],
                "markers": [0.70]
            };
            maxRatio = cluster.maxRatio;
        });

        $scope.toolTipContentFunction = function(){
            return function(key, x, y, e, graph) {
                return '<p>Max Ratio is ' + maxRatio + '</p>'
            }
        }

    }
]);
