/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Each view must define its own routing
 */
var homePageView = angular.module('prideClusterApp.homePageView', ['ngRoute'])

/**
 * Through routing we associate html templates with behaviour.
 * In this case the homePage.html template is associated with the HomePageCtrl when the app
 * navigates to the / url
 */
homePageView.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'views/homePage-view/homePage.html',
                controller: 'HomePageCtrl'
            });
        }
    ]);

/**
 * Controllers are may be injected with routing parameters. In this case they are not needed. Actually this view just
 * needs to load the html template. We leave an empty controller here just in case we need to process some parameters
 * in the future.
 */
homePageView.controller('HomePageCtrl', ['$scope', 'Stats',
    function($scope, Stats) {
        $scope.generalStats = Stats.getGeneralStats({}, function(stats){});
        console.log($scope.generalStats)
    }
]);
