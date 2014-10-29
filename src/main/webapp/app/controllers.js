var clusterWsUrl = "http://127.0.0.1:9091/cluster";

/* Controllers */

var prideClusterControllers = angular.module('prideClusterControllers', []);

prideClusterControllers.controller('ClusterListCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.jsonp(
            clusterWsUrl + "/list?callback=JSON_CALLBACK"
        ).success(function (data) {
                $scope.clusters = data;
            });
        $scope.sortField = 'id';
        $scope.reverse = true;
    }]);

prideClusterControllers.controller('ClusterDetailCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.jsonp(
            clusterWsUrl + "/" + $routeParams.clusterId + "?callback=JSON_CALLBACK"
        ).success(function (data) {
                $scope.cluster = data;
            });
    }]);