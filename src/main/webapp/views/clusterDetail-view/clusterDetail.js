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
clusterDetailView.controller('ClusterDetailViewCtrl', ['$scope', '$routeParams', 'ClusterDetail', 'ngProgress',
    function($scope, $routeParams, ClusterDetail, ngProgress) {
        $scope.clusterId = $routeParams.clusterId;

        ngProgress.start();

        $scope.cluster = ClusterDetail.get({clusterId: $routeParams.clusterId}, function (cluster) {
            ngProgress.set(50);
            $scope.cluster = cluster;
            $scope.mods = [];
            for (i=0; i<cluster.modifications.length; i++) {
                $scope.mods[cluster.modifications[i].mainPosition-1] = {
                    "name" : cluster.modifications[i].name,
                    "mainPosition": cluster.modifications[i].mainPosition,
                    "monoMass": cluster.modifications[i].monoMass
                };
            }
            ngProgress.set(100);
        });
        $scope.viewerId = "consensusSpectrumViewer-" + $routeParams.clusterId;

        ngProgress.complete();
    }
]);

