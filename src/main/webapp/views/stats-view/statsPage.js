/**
 * @author Rui Wang <rwang@ebi.ac.uk>
 *
 */
var statsPageView = angular.module('prideClusterApp.statsPageView', ['ngRoute']);

statsPageView.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/statistics', {
            templateUrl: 'views/stats-view/statsPage.html'
        });
    }
]);