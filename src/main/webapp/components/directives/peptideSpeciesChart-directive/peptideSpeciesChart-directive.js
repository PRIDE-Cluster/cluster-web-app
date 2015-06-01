/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-delta-mz-chart directive makes use of the prc-box-plot and the ClusterStats service
 * to show a confidence chart
 *
 */

var peptideSpeciesChartDirective = angular.module('prideClusterApp.peptideSpeciesChartDirective', []);

peptideSpeciesChartDirective.directive('prcPeptideSpeciesChart', function() {
    return {
        restrict: 'E',
        scope: {
            sourceId : '='
        },
        controller: 'PeptideSpeciesChartDirectiveCtrl',
        templateUrl: 'components/directives/peptideSpeciesChart-directive/peptideSpeciesChart-directive.html'
    };
});

peptideSpeciesChartDirective.controller('PeptideSpeciesChartDirectiveCtrl', ['$scope', 'OverlappingPeptidePerSpeciesPair',
    function($scope, OverlappingPeptidePerSpeciesPair) {

        var colours = ["#E41A1C", "#FFFF33", "#FF7F00", "#999999", "#984EA3", "#377EB8", "#4DAF4A", "#F781BF", "#A65628"];

        OverlappingPeptidePerSpeciesPair.getStats({}, function(stats){

            $scope.statsData = {};

            // set matrix
            $scope.statsData.matrix = stats.counts;

            // set labels;
            $scope.statsData.labels = [];
            for (var i = 0; i < stats.labels.length; i++) {
                var speciesName = stats.labels[i];
                var colour = colours[i % colours.length];
                $scope.statsData.labels.push({
                    "name" : speciesName,
                    "color" : colour
                })
            }
        });
    }
]);
