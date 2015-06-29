/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Each view must define its own routing
 */
var psmListView = angular.module('prideClusterApp.psmView', ['ngRoute']);

/**
 * Through routing we associate html templates with behaviour.
 * In this case the clusterList.html template is associated with the ClusterListCtrl when the app
 * navigates to the / url
 */
psmListView.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/id/:clusterId/psm', {
                templateUrl: 'views/psm-view/psm.html',
                controller: 'PSMListViewCtrl'
            });
        }
    ]);

/**
 * Controllers are injected with routing parameters. In this case the clusterId in the route is put in the $scope
 * for the view template to use.
 */
psmListView.controller('PSMListViewCtrl', ['$scope', '$routeParams',
        function($scope, $routeParams) {

        $scope.clusterId = $routeParams.clusterId;

        if (!$routeParams.sequence) {
            $routeParams.sequence = "";
            $scope.sequence = "";
        } else {
            $scope.sequence = $routeParams.sequence;
        }

        if (!$routeParams.modFilters) {
            $routeParams.modFilters = "";
            $scope.modFilters = "";
        } else {
            $scope.modFilters = $routeParams.modFilters;
        }

        if (!$routeParams.projectFilters) {
            $routeParams.projectFilters = "";
            $scope.projectFilters = "";
        } else {
            $scope.projectFilters= $routeParams.projectFilters;
        }

        if (!$routeParams.pageNumber) {
            $routeParams.pageNumber = 1;
            $scope.pageNumber = 1;
        } else {
            $scope.pageNumber = $routeParams.pageNumber;
        }

        if (!$routeParams.pageSize) {
            $routeParams.pageSize = 20;
            $scope.pageSize = 20;
        } else {
            $scope.pageSize = $routeParams.pageSize;
        }
    }
]);
