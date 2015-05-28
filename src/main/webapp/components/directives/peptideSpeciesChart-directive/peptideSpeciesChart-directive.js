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

        OverlappingPeptidePerSpeciesPair.getStats({}, function(stats){
            // sort the statistics according the name
            stats.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            var aggregateValues = {};

            for (var stat in stats) {
                if (stat.value > 50) {
                    // split name into two species
                }
            }

        });

        //$scope.statsData = {
        //    labels: [
        //        {
        //            name: "Human sapiens (Human)",
        //            color: "#E41A1C"
        //        },
        //        {
        //            name: "Mus musculus (Mouse)",
        //            color: "#FFFF33"
        //        },
        //        {
        //            name: "Rattus norvegicus (Rat)",
        //            color: "#FF7F00"
        //        },
        //        {
        //            name: "Glia",
        //            color: "#FF7F00"
        //        },
        //        {
        //            name: "Test species",
        //            color: "#E41A1C"
        //        },
        //        {
        //            name: "Test species 1",
        //            color: "#E41A1C"
        //        },
        //        {
        //            name: "Others",
        //            color: "#E41A1C"
        //        }
        //    ],
        //    matrix: [
        //        [0, 100, 200, 300, 400, 500, 600],
        //        [100, 0, 200, 300, 400, 500, 600],
        //        [200, 100, 0, 300, 400, 500, 600],
        //        [300, 100, 200, 0, 400, 500, 600],
        //        [400, 100, 200, 300, 0, 500, 600],
        //        [500, 100, 200, 300, 400, 0, 600],
        //        [600, 100, 200, 300, 400, 500, 0]
        //    ]
        //}

    }
]);
