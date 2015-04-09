/**
 * @author Jose A. Dianes <jadianes@gmail.com>
 *
 *
 */

var modificationsChartDirective = angular.module('prideClusterApp.modificationsChartDirective', [])

modificationsChartDirective.directive('prcModificationsChart', function() {
    return {
        restrict: 'EA',
        scope: {
            sourceId : '='
        },
        controller: 'ModificationsChartDirectiveCtrl',
        templateUrl: 'components/directives/modificationsChart-directive/modificationsChart-directive.html'
    };
});

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the cluster detail controller accesses the ClusterDetail end point to get details of
 * individual Clusters. These details are assigned to model objects in order to be accessed later on
 * within the html template part of the view.
 */
modificationsChartDirective.controller('ModificationsChartDirectiveCtrl', ['$scope', 'ClusterModifications',
    function($scope, ClusterModifications) {

        ClusterModifications.get({clusterId: $scope.sourceId}, function(modifications) {

            $scope.modificationsData = modifications.modificationCounts;
            $scope.xFunction = function(){
                return function(d) {
                    return d.modificationName;
                };
            }
            $scope.yFunction = function(){
                return function(d){
                    return d.count;
                };
            }
            $scope.toolTipContentFunction = function(){
                return function(key, x, y, e, graph) {
                    return '<p>' + Math.round(x) + ' peptides include ' + key + '</p>';
                }
            }
        });

    }
]);
