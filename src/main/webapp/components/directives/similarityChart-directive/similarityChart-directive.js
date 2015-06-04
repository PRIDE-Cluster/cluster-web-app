/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-similarity-chart directive makes use of the prc-box-plot and the ClusterStats service
 * to show a confidence chart
 *
 */

var similarityChartDirective = angular.module('prideClusterApp.similarityChartDirective', [])

similarityChartDirective.directive('prcSimilarityChart', function() {
    return {
        restrict: 'EA',
        scope: {
            sourceId : '='
        },
        controller: 'SimilarityChartDirectiveCtrl',
        templateUrl: 'components/directives/similarityChart-directive/similarityChart-directive.html'
    };
});

similarityChartDirective.controller('SimilarityChartDirectiveCtrl', ['$scope', 'ClusterStats',
    function($scope, ClusterStats) {

        ClusterStats.similarity({clusterId: $scope.sourceId}, function(stats) {
            $scope.statsData = [];
            $scope.statsData[0] = [];
            $scope.statsData[1] = [];
            $scope.statsData[0][0] = "Consensus Peptide";
            $scope.statsData[1][0] = "Cluster";
            $scope.statsData[0][1] = stats.highRatioPeptideSpectrumSimilarities;
            $scope.statsData[1][1] = stats.clusterSpectrumSimilarities;
        });

    }
]);
