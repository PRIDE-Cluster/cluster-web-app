/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Each view must define its own routing
 */
var clusterChartView = angular.module('prideClusterApp.clusterChartView', ['ngRoute'])

/**
 * Through routing we associate html templates with behaviour.
 * In this case the clusterChart.html template is associated with the ClusterChartCtrl when the app
 * navigates to the /chart url
 */
clusterChartView.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/chart', {
                templateUrl: 'views/clusterChart-view/clusterChart.html',
                controller: 'ClusterChartViewCtrl'
            });
        }
    ]);

/**
 * Controllers are injected with routing parameters. In this case the clusterId in the route is put in the $scope
 * for the view template to use.
 */
clusterChartView.controller('ClusterChartViewCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {

        if (!$routeParams.q) {
            $scope.queryTerm = "";
        } else {
            $scope.queryTerm = $routeParams.q;
        }

        if (!$routeParams.page) {
            $scope.pageNumber = 1;
        } else {
            $scope.pageNumber = $routeParams.page;
        }

        if (!$routeParams.size) {
            $scope.pageSize = 50;
        } else {
            $scope.pageSize = $routeParams.size;
        }
    }
]);
