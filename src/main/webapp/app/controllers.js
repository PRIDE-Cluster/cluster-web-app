
/* Controllers */

var prideClusterControllers = angular.module('prideClusterControllers', []);

prideClusterControllers.controller('ClusterListCtrl', ['$scope', '$routeParams', 'Clusters',
    function($scope, $routeParams, Clusters) {
        $scope.clusters = Clusters.query({q:$routeParams.q}, function(clusters) {

        });
        $scope.sortField = 'id';
        $scope.reverse = true;
    }]);

prideClusterControllers.controller('ClusterDetailCtrl', ['$scope', '$routeParams', 'Cluster',
    function($scope, $routeParams, Cluster) {
        $scope.cluster = Cluster.get({clusterId: $routeParams.clusterId}, function(cluster) {

        });
    }]);