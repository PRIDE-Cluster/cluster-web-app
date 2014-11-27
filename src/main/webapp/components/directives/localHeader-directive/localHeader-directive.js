/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list-filters directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */

var localHeaderDirective = angular.module('prideClusterApp.localHeaderDirective', [])

localHeaderDirective.directive('prcLocalHeader', ['CurrentSearchState', function(CurrentSearchState) {

    return {
        restrict: 'E',
        scope: {

        },
        controller: 'LocalHeaderCtrl',
        templateUrl: 'components/directives/localHeader-directive/localHeader-directive.html'
    };
}]);

localHeaderDirective.controller('LocalHeaderCtrl', ['$scope', '$location', 'CurrentSearchState',
    function($scope, $location, CurrentSearchState) {

        function updateState() {
            // Set location (URL)
            $location.path(CurrentSearchState.getViewPath());
            $location.search({
                q:CurrentSearchState.getQuery(),
                page:CurrentSearchState.getPageNumber(),
                size:CurrentSearchState.getPageSize()
            });
        }

        $scope.search = function() {
            CurrentSearchState.setQuery($scope.searchTerm);
            updateState();
        }
    }
]);
