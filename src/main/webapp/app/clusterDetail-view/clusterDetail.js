var clusterDetailView = angular.module('prideClusterApp.clusterDetailView', ['ngRoute'])

// ROUTING VIEWS
clusterDetailView.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/cluster/:clusterId', {
            templateUrl: 'app/clusterDetail-view/clusterDetail.html',
            controller: 'ClusterDetailCtrl'
        });
    }
]);

// CONTROLLERS
clusterDetailView.controller('ClusterDetailCtrl', ['$scope', '$routeParams', 'ClusterDetail',
    function($scope, $routeParams, ClusterDetail) {
        $scope.cluster = ClusterDetail.get({clusterId: $routeParams.clusterId}, function(cluster) {

        });
    }
]);

