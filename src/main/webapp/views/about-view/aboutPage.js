/**
 * @author Rui Wang <rwang@ebi.ac.uk>
 *
 */
var aboutPageView = angular.module('prideClusterApp.aboutPageView', ['ngRoute']);

aboutPageView.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'views/about-view/aboutPage.html',
            controller: 'AboutPageViewCtrl'
        });
    }
]);

aboutPageView.controller('AboutPageViewCtrl', function($scope, $location, $anchorScroll) {
    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    }
});