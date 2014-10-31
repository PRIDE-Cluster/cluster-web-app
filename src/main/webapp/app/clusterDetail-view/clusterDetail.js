/**
 * Each view must define its own routing and Controllers.
 */
var clusterDetailView = angular.module('prideClusterApp.clusterDetailView', ['ngRoute'])

/**
 * Through routing we associate html templates with behaviour.
 * In this case the clusterDetail.html template is associated with the ClusterDetailController when the app
 * navigates to a specific cluster
 */
clusterDetailView.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/cluster/:clusterId', {
            templateUrl: 'app/clusterDetail-view/clusterDetail.html',
            controller: 'ClusterDetailCtrl'
        });
    }
]);

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the cluster detail controller accesses the ClusterDetail end point to get details of
 * individual Clusters. These details are assigned to model objects in order to be accessed later on
 * within the html template part of the view.
 */
clusterDetailView.controller('ClusterDetailCtrl', ['$scope', '$routeParams', 'ClusterDetail',
    function($scope, $routeParams, ClusterDetail) {
        $scope.cluster = ClusterDetail.get({clusterId: $routeParams.clusterId}, function(cluster) {

        });
    }
]);

