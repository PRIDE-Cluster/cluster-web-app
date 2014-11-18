/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-spectrum-viewer directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */

var speciesChartDirective = angular.module('prideClusterApp.speciesChartDirective', [])

speciesChartDirective.directive('prcSpeciesChart', function() {
    function link(scope, element, attrs) {

    }
    return {
        restrict: 'E',
        scope: {
            sourceId : '=sourceid'
        },
        controller: 'SpeciesChartDirectiveCtrl',
        link: link,
        templateUrl: 'components/speciesChart-directive/speciesChart-directive.html'
    };
});

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the cluster detail controller accesses the ClusterDetail end point to get details of
 * individual Clusters. These details are assigned to model objects in order to be accessed later on
 * within the html template part of the view.
 */
speciesChartDirective.controller('SpeciesChartDirectiveCtrl', ['$scope', 'ClusterSpecies',
    function($scope, ClusterSpecies) {

        ClusterSpecies.get({clusterId: $scope.sourceId}, function(species) {
            $scope.speciesData = species;
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
                    return '<p>' + Math.round(x) + ' PSM for' + key + '</p>';
                }
            }
        });

    }
]);
