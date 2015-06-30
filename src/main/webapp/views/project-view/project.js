/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Each view must define its own routing
 */
var projectListView = angular.module('prideClusterApp.projectView', ['ngRoute']);

/**
 * Through routing we associate html templates with behaviour.
 * In this case the clusterList.html template is associated with the ClusterListCtrl when the app
 * navigates to the / url
 */
projectListView.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/id/:clusterId/project', {
                templateUrl: 'views/project-view/project.html',
                controller: 'ProjectListViewCtrl'
            });
        }
    ]);

/**
 * Controllers are injected with routing parameters. In this case the clusterId in the route is put in the $scope
 * for the view template to use.
 */
projectListView.controller('ProjectListViewCtrl', ['$scope', '$routeParams',
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
    }
]);
