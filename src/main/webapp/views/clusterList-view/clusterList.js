/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Each view must define its own routing
 */
var clusterListView = angular.module('prideClusterApp.clusterListView', ['ngRoute'])

/**
 * Through routing we associate html templates with behaviour.
 * In this case the clusterList.html template is associated with the ClusterListCtrl when the app
 * navigates to the / url
 */
clusterListView.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'views/clusterList-view/clusterList.html',
                controller: 'ClusterListViewCtrl'
            });
        }
    ]);

/**
 * Controllers are injected with routing parameters. In this case the clusterId in the route is put in the $scope
 * for the view template to use.
 */
clusterListView.controller('ClusterListViewCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {

        if (!$routeParams.q) {
            $routeParams.q = "";
            $scope.queryTerm = "";
        } else {
            $scope.queryTerm = $routeParams.q;
        }

        if (!$routeParams.page) {
            $routeParams.page = 1;
            $scope.pageNumber = 1;
        } else {
            $scope.pageNumber = $routeParams.page;
        }

        if (!$routeParams.size) {
            $routeParams.size = 10;
            $scope.pageSize = 10;
        } else {
            $scope.pageSize = $routeParams.size;
        }

    }
]);