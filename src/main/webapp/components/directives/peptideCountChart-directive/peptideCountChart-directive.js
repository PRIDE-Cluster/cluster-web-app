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
        // sort the statistics according the number of
        stats.sort(function (a, b) {
            return a.value - b.value;
        });

        // summarise the count
        var othersCnt = 0;
        for (i = 0; i < stat.length; i++) {
            if (i < 6) {
                $scope.peptideCountData.push({
                    "speciesName": stat.name,
                    "count" : stat.value
                });
            } else {
                othersCnt += stat.value;
            }
        }

        $scope.peptideCountData.push(
        {
            "speciesName": "Others",
            "count" : othersCnt
        });
    });

    //$scope.peptideCountData = [
    //    {
    //        "speciesName": "Human sapiens (Human)",
    //        "count": 10000
    //    },
    //    {
    //        "speciesName": "Mus musculus (Mouse)",
    //        "count": 20000
    //    },
    //    {
    //        "speciesName": "Rattus norvegicus (Rat)",
    //        "count":1000
    //    },
    //    {
    //        "speciesName": "Glia",
    //        "count":10000
    //    },
    //    {
    //        "speciesName": "Others",
    //        "count":2000
    //    }
    //];

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
            return '<p>' + Math.round(x) + ' peptides include ' + key + '</p>';
        }
    };

}]);
