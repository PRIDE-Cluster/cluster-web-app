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
        scope: { clusterId : '=' },
        controller: 'ClusterDetailDirectiveCtrl',
        templateUrl: 'components/directives/clusterDetail-directive/clusterDetail-directive.html'
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
        var maxRatio, numberOfSpectra;
        function getCluster(clusterId) {
            $scope.cluster = ClusterDetail.get({clusterId: clusterId}, function (cluster) {
                $scope.maxRatioData = {
                    "title": "",
                    "subtitle": "",
                    "ranges": [0.0, 1.0],
                    "measures": [cluster.maxRatio],
                    "markers": [0.7]
                };
                maxRatio = cluster.maxRatio;
                $scope.numberOfSpectraData = {
                    "title": "",
                    "subtitle": "",
                    "ranges": [0, Math.max(cluster.numberOfSpectra, 10)],
                    "measures": [cluster.numberOfSpectra],
                    "markers": [10]
                };
                numberOfSpectra = cluster.numberOfSpectra;

            });
        }

        $scope.toolTipContentFunction = function(){
            return function(key, x, y, e, graph) {
                return '<p>Max Ratio is ' + maxRatio + '</p>'
            }
        };

        $scope.toolTipContentFunctionNumberOfSpectra = function(){
            return function(key, x, y, e, graph) {
                return '<p>' + numberOfSpectra + ' spectra</p>'
            }
        };

        $scope.$watch('clusterId', function() {
            getCluster($scope.clusterId);
        });

        getCluster($scope.clusterId);
    }
]);
