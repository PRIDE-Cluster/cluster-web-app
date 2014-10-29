var clusterWsUrl = "http://127.0.0.1:9091/cluster/list?callback=JSON_CALLBACK";
var prideClusterApp = angular.module('prideClusterApp', []);

prideClusterApp.controller('PrideClusterCtrl', function ($scope, $http) {
    $http.jsonp(
        clusterWsUrl).success(function (data) {
        $scope.clusters = data;
    });
    $scope.sortField = 'id';
    $scope.reverse = true;
});
