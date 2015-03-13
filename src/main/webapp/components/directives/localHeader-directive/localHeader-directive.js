/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list-filters directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */

var localHeaderDirective = angular.module('prideClusterApp.localHeaderDirective', [])

localHeaderDirective.directive('prcLocalHeader', function() {

    return {
        restrict: 'E',
        scope: {
          'menu':'@'
        },
        replace: true,
        link: function (scope, element, attrs) {

            scope.checkActive = function (val) {
                console.log('Value ' + val);

                return val === attrs.menu ? 'active' : null;
            }
        },
        controller: 'LocalHeaderCtrl',
        templateUrl: 'components/directives/localHeader-directive/localHeader-directive.html'
    };
});

localHeaderDirective.controller('LocalHeaderCtrl', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {

        $scope.searchTerm = $routeParams.q;

        function updateState() {
            $location.path("#/list");
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
