/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
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
            templateUrl: 'views/clusterDetail-view/clusterDetail.html',
            controller: 'ClusterDetailViewCtrl'
        });
    }
]);

/**
 * Controllers are injected with routing parameters. In this case the clusterId in the route is put in the $scope
 * for the view template to use.
 */
clusterDetailView.controller('ClusterDetailViewCtrl', ['$scope', '$routeParams', 'ClusterDetail',
    function($scope, $routeParams, ClusterDetail) {
        $scope.clusterId = $routeParams.clusterId;
        $scope.cluster = ClusterDetail.get({clusterId: $routeParams.clusterId}, function (cluster) {
            $scope.cluster = cluster;
            $scope.mods = [];
            for (i=0; i<cluster.modifications.length; i++) {
                $scope.mods[cluster.modifications[i].mainPosition-1] = cluster.modifications[i].name;
            }
        });
        $scope.viewerId = "consensusSpectrumViewer-" + $routeParams.clusterId;
    }
]);

