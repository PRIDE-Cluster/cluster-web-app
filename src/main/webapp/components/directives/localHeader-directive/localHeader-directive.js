/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list-filters directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */

var localHeaderDirective = angular.module('prideClusterApp.localHeaderDirective', [])

localHeaderDirective.directive('prcLocalHeader', ['CurrentSearchState', function() {

    return {
        restrict: 'E',
        scope: {

        },
        controller: 'LocalHeaderCtrl',
        templateUrl: 'components/directives/localHeader-directive/localHeader-directive.html'
    };
}]);

localHeaderDirective.controller('LocalHeaderCtrl', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {

        $scope.searchTerm = $routeParams.q;

        function updateState() {
            $location.search({
                q:$scope.searchTerm,
                page:$routeParams.page,
                size:$routeParams.size
            });
        }

        $scope.search = function() {
            updateState();
        }
    }
]);