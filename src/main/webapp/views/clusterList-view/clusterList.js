/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Each view must define its own routing
 */
var clusterListView = angular.module('prideClusterApp.clusterListView', ['ngRoute']);

/**
 * Through routing we associate html templates with behaviour.
 * In this case the clusterList.html template is associated with the ClusterListCtrl when the app
 * navigates to the / url
 */
clusterListView.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/list', {
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
            $routeParams.size = 20;
            $scope.pageSize = 20;
        } else {
            $scope.pageSize = $routeParams.size;
        }

        if (!$routeParams.modFilters) {
            $routeParams.modFilters = [];
            $scope.modFilters = [];
        } else {
            $scope.modFilters = $routeParams.modFilters;
        }

        if (!$routeParams.speciesFilters) {
            $routeParams.speciesFilters = [];
            $scope.speciesFilters = [];
        } else {
            $scope.speciesFilters = $routeParams.speciesFilters;
        }

        if (!$routeParams.sortField) {
            $routeParams.sortField = "";
            $scope.sortField = "";
        } else {
            $scope.sortField = $routeParams.sortField;
        }

        if (!$routeParams.sortOrder) {
            $routeParams.sortOrder = "";
            $scope.sortOrder = "";
        } else {
            $scope.sortOrder = $routeParams.sortOrder;
        }
    }
]);
