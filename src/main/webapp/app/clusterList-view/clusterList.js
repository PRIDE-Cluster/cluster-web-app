var clusterListModule = angular.module('prideClusterApp.clusterListView', ['ngRoute'])

// ROUTING VIEWS
clusterListModule.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/list', {
                templateUrl: 'app/clusterList-view/clusterList.html',
                controller: 'ClusterListCtrl'
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
