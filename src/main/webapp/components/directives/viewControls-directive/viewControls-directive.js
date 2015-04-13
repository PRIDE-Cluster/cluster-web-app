/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-view-controls directive allows us to change view type.
 *
 */

var viewControlsDirective = angular.module('prideClusterApp.viewControlsDirective', [])

viewControlsDirective.directive('prcViewControls', function() {
    return {
        restrict: 'AE',
        scope: {

        },
        controller: "ViewControlsCtrl",
        templateUrl: 'components/directives/viewControls-directive/viewControls-directive.html'
    };
});

viewControlsDirective.controller('ViewControlsCtrl', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {

        function updateState(view) {
            // Set location (URL)
            $location.path(view);
            $location.search({
                q:$routeParams.q,
                page:$routeParams.page,
                size:$routeParams.size
            });
        }

        // attach filter-submit function
        $scope.listSubmit = function() {
            updateState("list");
        }

        $scope.chartSubmit = function() {
            updateState("chart");
        }

    }
]);


