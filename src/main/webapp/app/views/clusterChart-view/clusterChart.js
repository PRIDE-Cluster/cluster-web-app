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
clusterChartView.controller('ClusterChartViewCtrl', ['$scope', '$routeParams', 'CurrentSearchState',
    function($scope, $routeParams, CurrentSearchState) {
        // Capture current search state
        if (!$routeParams.q) {
            CurrentSearchState.setQuery($scope.queryTerm);
        } else {
            CurrentSearchState.setQuery($routeParams.q)
        }
        if (!$routeParams.page) {
            CurrentSearchState.setPageNumber(1);
        } else {
            CurrentSearchState.setPageNumber($routeParams.page);
        }
        if (!$routeParams.size) {
            CurrentSearchState.setPageSize(100);
        } else {
            CurrentSearchState.setPageSize($routeParams.size);
        }

        // Put the current search state into the scope for the template to use
        $scope.queryTerm = CurrentSearchState.getQuery();
        $scope.pageNumber = CurrentSearchState.getPageNumber();
        $scope.pageSize = CurrentSearchState.getPageSize();
    }
]);
