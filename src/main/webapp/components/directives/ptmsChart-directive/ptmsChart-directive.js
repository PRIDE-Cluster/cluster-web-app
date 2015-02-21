/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 *
 */

var ptmsChartDirective = angular.module('prideClusterApp.ptmsChartDirective', [])

ptmsChartDirective.directive('prcPtmsChart', function() {
    function link(scope, element, attrs) {

    }
    return {
        restrict: 'E',
        scope: {
            sourceId : '='
        },
        controller: 'PtmsChartDirectiveCtrl',
        link: link,
        templateUrl: 'components/directives/ptmsChart-directive/ptmsChart-directive.html'
    };
});

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the cluster detail controller accesses the ClusterDetail end point to get details of
 * individual Clusters. These details are assigned to model objects in order to be accessed later on
 * within the html template part of the view.
 */
ptmsChartDirective.controller('PtmsChartDirectiveCtrl', ['$scope', 'ClusterSpecies',
    function($scope, ClusterSpecies) {

        ClusterSpecies.get({clusterId: $scope.sourceId}, function(species) {

            $scope.ptmsData = species.speciesCounts;
            $scope.xFunction = function(){
                return function(d) {
                    return d.speciesName;
                };
            }
            $scope.yFunction = function(){
                return function(d){
                    return d.speciesCount;
                };
            }
            $scope.toolTipContentFunction = function(){
                return function(key, x, y, e, graph) {
                    return '<p>' + Math.round(x) + ' PSM for ' + key + '</p>';
                }
            }
        });

    }
]);
