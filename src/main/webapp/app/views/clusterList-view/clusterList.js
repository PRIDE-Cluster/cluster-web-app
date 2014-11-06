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
clusterDetailView.controller('ClusterListViewCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        if (!$routeParams.q) {
            $routeParams.q = "";
        }
        if (!$routeParams.page) {
            $routeParams.page = 1;
        }
        if (!$routeParams.size) {
            $routeParams.size = 10;
        }
        $scope.queryTerm = $routeParams.q;
        console.log("[ClusterListViewCtrl] - q is " + $routeParams.q)
        console.log("[ClusterListViewCtrl] - queryTerm is " + $scope.queryTerm)
        $scope.pageNumber = $routeParams.page;
        console.log("[ClusterListViewCtrl] - page is " + $routeParams.page)
        console.log("[ClusterListViewCtrl] - pageNumber is " + $scope.pageNumber)
        $scope.pageSize = $routeParams.size;
        console.log("[ClusterListViewCtrl] - size is " + $routeParams.size)
        console.log("[ClusterListViewCtrl] - pageSize is " + $scope.pageSize)
    }
]);
