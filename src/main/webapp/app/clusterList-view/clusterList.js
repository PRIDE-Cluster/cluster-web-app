/**
 * Each view must define its own routing and Controllers.
 */
var clusterListModule = angular.module('prideClusterApp.clusterListView', ['ngRoute'])

/**
 * Through routing we associate html templates with behaviour.
 * In this case the clusterList.html template is associated with the ClusterListCtrl when the app
 * navigates to the /list url
 */
clusterListModule.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/list', {
                templateUrl: 'app/clusterList-view/clusterList.html',
                controller: 'ClusterListCtrl'
                });
        }
    ]);

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the cluster list controller accesses the ClusterSummary end point to get lists of Cluster summaries.
 * The list of clusters is assigned to a model object in order to be accessed later on within the html template
 * part of the view.
 * Other model objects include sortField and reverse, used to sort the cluster list
 */
clusterListModule.controller('ClusterListCtrl', ['$scope', '$routeParams', 'ClusterSummary',
    function($scope, $routeParams, ClusterSummary) {
        $scope.clusters = ClusterSummary.list({}, function(clusters) {

        });
        $scope.sortField = 'id';
        $scope.reverse = true;
    }
]);
