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
                templateUrl: 'app/views/clusterList-view/clusterList.html'
            });
        }
    ]);

