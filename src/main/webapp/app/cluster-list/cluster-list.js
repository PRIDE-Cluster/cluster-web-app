var clusterListModule = angular.module('prideClusterApp.cluster-list', ['ngRoute', 'ngResource'])
var clusterSummaryWsUrl = "http://127.0.0.1:9091/clusterSummary";

// ROUTING VIEWS
clusterListModule.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/list', {
                templateUrl: 'app/cluster-list/cluster-list.html',
                controller: 'ClusterListCtrl'
                });
        }
    ]);

// SERVICES
clusterListModule.factory('ClusterSummary', ['$resource',
    function($resource){
        return $resource(clusterSummaryWsUrl + '/list' + '?callback=JSON_CALLBACK', {}, {
            list: {method:'JSONP', params:{}, isArray:true, callback: 'JSON_CALLBACK'}
        });
    }
]);

// CONTROLLERS
clusterListModule.controller('ClusterListCtrl', ['$scope', '$routeParams', 'ClusterSummary',
    function($scope, $routeParams, ClusterSummary) {
        $scope.clusters = ClusterSummary.list({}, function(clusters) {

        });
        $scope.sortField = 'id';
        $scope.reverse = true;
    }
]);
