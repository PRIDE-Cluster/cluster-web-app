var clusterDetailModule = angular.module('prideClusterApp.cluster-detail', ['ngRoute', 'ngResource'])
var clusterDetailWsUrl = "http://127.0.0.1:9091/clusterDetail";


clusterDetailModule.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/cluster/:clusterId', {
            templateUrl: 'app/cluster-detail/cluster-detail.html',
            controller: 'ClusterDetailCtrl'
        });
    }
]);

clusterDetailModule.controller('ClusterDetailCtrl', ['$scope', '$routeParams', 'ClusterDetail',
    function($scope, $routeParams, ClusterDetail) {
        $scope.cluster = ClusterDetail.get({clusterId: $routeParams.clusterId}, function(cluster) {

        });
    }
]);

clusterDetailModule.factory('ClusterDetail', ['$resource',
    function($resource){
        return $resource(clusterDetailWsUrl + '/:clusterId' + '?callback=JSON_CALLBACK', {}, {
            get: {method:'JSONP', params:{clusterId:'clusters'}, isArray:false, callback: 'JSON_CALLBACK'}
        });
    }
]);