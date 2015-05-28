/**
 *
 * @author Rui Wang
 */

var clusterCountChartDirective = angular.module('prideClusterApp.clusterCountChartDirective', []);

clusterCountChartDirective.directive('prcClusterCountChart', function() {
    return {
        restrict: 'EA',
        scope: {},
        controller: 'ClusterCountChartDirectiveCtrl',
        templateUrl: 'components/directives/clusterCountChart-directive/clusterCountChart-directive.html'
    };
});

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the cluster detail controller accesses the ClusterDetail end point to get details of
 * individual Clusters. These details are assigned to model objects in order to be accessed later on
 * within the html template part of the view.
 */
clusterCountChartDirective.controller('ClusterCountChartDirectiveCtrl', ['$scope', 'ClusterPerSpecies', function($scope, ClusterPerSpecies) {


    ClusterPerSpecies.getStats({}, function(stats){
        // sort the statistics according the number of clusters
        var repoStatistics = stats.repoStatistics;

        repoStatistics.sort(function (a, b) {
            return b.value - a.value;
        });

        // summarise the count
        var values = [];
        for (i = 0; i < repoStatistics.length; i++) {
            if (i > 9) {
                break;
            }
            values.push([repoStatistics[i].name, repoStatistics[i].value]);
        }

        // prepare for display
        $scope.clusterCountData = [
            {
                "key": "species",
                "values": values
            }
        ];

        $scope.xFunction = function(){
            return function(d){
                return d[0];
            };
        };

        $scope.yFunction = function(){
            return function(d){
                return d[1];
            };
        };

        $scope.toolTipContentFunction = function(){
            return function(key, x, y, e, graph) {
                var countStr = y.toString();
                return '<h5>' + x + '</h5>' +
                    '<p>' +  countStr.substring(0, countStr.length - 2) + ' high quality clusters</p>'
            }
        };

    });
}]);
