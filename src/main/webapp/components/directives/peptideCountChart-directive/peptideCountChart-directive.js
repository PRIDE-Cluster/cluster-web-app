/**
 *
 * @author Rui Wang
 */

var peptideCountChartDirective = angular.module('prideClusterApp.peptideCountChartDirective', []);

peptideCountChartDirective.directive('prcPeptideCountChart', function() {
    return {
        restrict: 'EA',
        scope: {},
        controller: 'PeptideCountChartDirectiveCtrl',
        templateUrl: 'components/directives/peptideCountChart-directive/peptideCountChart-directive.html'
    };
});

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the cluster detail controller accesses the ClusterDetail end point to get details of
 * individual Clusters. These details are assigned to model objects in order to be accessed later on
 * within the html template part of the view.
 */
peptideCountChartDirective.controller('PeptideCountChartDirectiveCtrl', ['$scope', 'PeptidePerSpecies', function($scope, PeptidePerSpecies) {



    PeptidePerSpecies.getStats({}, function(stats){
        $scope.peptideCountData = [];

        // sort the statistics according the number of unique peptides
        var repoStatistics = stats.repoStatistics;

        repoStatistics.sort(function (a, b) {
            return b.value - a.value;
        });

        // summarise the count
        for (i = 0; i < repoStatistics.length; i++) {
            if (i > 9) {
                break;
            }

            $scope.peptideCountData.push({
                "speciesName": repoStatistics[i].name,
                "count" : repoStatistics[i].value
            });
        }

        $scope.xFunction = function(){
            return function(d) {
                return d.speciesName;
            };
        };

        $scope.yFunction = function(){
            return function(d){
                return d.count;
            };
        };

        $scope.toolTipContentFunction = function(){
            return function(key, x, y, e, graph) {
                var countStr = x.toString();
                return '<p>' + countStr.substring(0, countStr.length - 3) + ' unique peptides for ' + key + '</p>';
            }
        };
    });



}]);
