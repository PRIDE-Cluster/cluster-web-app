/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-delta-mz-chart directive makes use of the prc-box-plot and the ClusterStats service
 * to show a confidence chart
 *
 */

var deltaMzChartDirective = angular.module('prideClusterApp.deltaMzChartDirective', [])

deltaMzChartDirective.directive('prcDeltaMzChart', function() {
    return {
        restrict: 'EA',
        scope: {
            sourceId : '='
        },
        controller: 'DeltaMzChartDirectiveCtrl',
        templateUrl: 'components/directives/deltaMzChart-directive/deltaMzChart-directive.html'
    };
});

deltaMzChartDirective.controller('DeltaMzChartDirectiveCtrl', ['$scope', 'ClusterStats',
    function($scope, ClusterStats) {

        ClusterStats.delta({clusterId: $scope.sourceId}, function(stats) {
            $scope.statsData = [];
            $scope.statsData[0] = [];
            $scope.statsData[1] = [];
            $scope.statsData[0][0] = "High Ratio Peptide";
            $scope.statsData[1][0] = "Cluster";
            $scope.statsData[0][1] = stats.highRatioPeptideDeltaMzs;
            $scope.statsData[1][1] = stats.clusterDeltaMzs;
        });

    }
]);
