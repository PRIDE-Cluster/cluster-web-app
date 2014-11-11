/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Each view must define its own routing
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
                templateUrl: 'app/views/clusterList-view/clusterList.html',
                controller: 'ClusterListViewCtrl'
            });
        }
    ]);

/**
 * Controllers are injected with routing parameters. In this case the clusterId in the route is put in the $scope
 * for the view template to use.
 */
clusterDetailView.controller('ClusterListViewCtrl', ['$scope', '$routeParams', 'CurrentSearchState',
    function($scope, $routeParams, CurrentSearchState) {
        // Capture current search state
        if (!$routeParams.q) {
            CurrentSearchState.setQuery("");
        } else {
            CurrentSearchState.setQuery($routeParams.q)
        }
        if (!$routeParams.page) {
            CurrentSearchState.setPage(1);
        } else {
            CurrentSearchState.setPage($routeParams.page);
        }
        if (!$routeParams.size) {
            CurrentSearchState.setPageSize(10);
        } else {
            CurrentSearchState.setPageSize($routeParams.size);
        }

        // Put the current search state into the scope for the template to use
        $scope.queryTerm = CurrentSearchState.getQuery();
        $scope.pageNumber = CurrentSearchState.getPage();
        $scope.pageSize = CurrentSearchState.getPageSize();
        $scope.maxPages = 5;
        $scope.pageNumbers = new Array($scope.maxPages)
    }
]);
