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

            function compare(mod1, mod2) {
                if (mod1.count < mod2.count) {
                    return 1;
                }

                if (mod1.count > mod2.count) {
                    return -1;
                }

                return 0;
            }

            $scope.modificationsData.sort(compare);

            // format input mods to group modifications with lower count into 'others' category
            function formatResults(inMods) {
                var maxModShown = 7;

                if (inMods.length <= maxModShown) {
                    return inMods;
                } else {
                    var formattedResults = [];
                    var otherCount = 0;
                    $.each(inMods,function(i, val) {
                        if (i < maxModShown) {
                            formattedResults.push({'modificationName':val.modificationName, 'count':val.count});
                        } else {
                            otherCount += val.count;
                        }
                    });
                    // add others species
                    formattedResults.push({'modificationName': 'Others', 'count':otherCount});

                    return formattedResults;
                }
            }

            $scope.modificationsData = formatResults($scope.modificationsData);

            $scope.xFunction = function(){
                return function(d) {
                    return d.modificationName;
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
                    return '<p>' + countStr.substring(0, countStr.length - 3) + ' PSMs include ' + key + '</p>';
                }
            }
        });

    }
]);
