/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list-filters directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */

var localHeaderDirective = angular.module('prideClusterApp.localHeaderDirective', []);

localHeaderDirective.directive('prcLocalHeader', function() {

    return {
        restrict: 'E',
        scope: {
          'menu':'@'
        },
        replace: true,
        controller: 'LocalHeaderCtrl',
        templateUrl: 'components/directives/localHeader-directive/localHeader-directive.html'
    };
});

localHeaderDirective.controller('LocalHeaderCtrl', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {

        $scope.searchTerm = $routeParams.q;

        $scope.search = function updateState() {
            $location.path("list");
            $location.search({
                q:$scope.searchTerm,
                page:$routeParams.page,
                size:$routeParams.size,
                modFilters:$routeParams.modFilters,
                speciesFilters:$routeParams.speciesFilters
            });
        };

        $scope.isActive = function(path) {
            if ($location.path().substr(0, path.length) == path) {
                if (path == "/" && $location.path() == "/") {
                    return true;
                } else {
                    return path != "/";
                }

            } else {
                return false;
            }
        };

    }
]);
