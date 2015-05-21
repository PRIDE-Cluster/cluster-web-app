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
clusterCountChartDirective.controller('ClusterCountChartDirectiveCtrl', ['$scope', function($scope) {

    $scope.clusterCountData = [
        {
            "key": "species",
            "values": [
                        ["Human sapiens (Human)", 200000],
                        ["Mus musculus (Mouse)", 20000],
                        ["Rattus norvegicus (Rat)", 1000],
                        ["Glia", 10000],
                        ["Test species", 20000],
                        ["Test species 1", 30000],
                        ["Others", 2000]
                      ]
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
                '<p>' +  countStr.substring(0, countStr.length - 2) + ' unique peptide sequences</p>'
        }
    };
}]);
