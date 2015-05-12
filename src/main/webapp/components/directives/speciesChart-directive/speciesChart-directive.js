/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-spectrum-viewer directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */

var speciesChartDirective = angular.module('prideClusterApp.speciesChartDirective', [])

speciesChartDirective.directive('prcSpeciesChart', function() {
    return {
        restrict: 'EA',
        scope: {
            sourceId : '=',
            totalNumberOfSpecies : '='
        },
        controller: 'SpeciesChartDirectiveCtrl',
        templateUrl: 'components/directives/speciesChart-directive/speciesChart-directive.html'
    };
});

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the cluster detail controller accesses the ClusterDetail end point to get details of
 * individual Clusters. These details are assigned to model objects in order to be accessed later on
 * within the html template part of the view.
 */
speciesChartDirective.controller('SpeciesChartDirectiveCtrl', ['$scope', 'ClusterSpecies',
    function($scope, ClusterSpecies) {

        ClusterSpecies.get({clusterId: $scope.sourceId}, function(species) {

            $scope.speciesData = species.speciesCounts;

            // compare two species data
            function compare(s1, s2) {
                if (s1.count < s2.count) {
                    return 1;
                }

                if (s1.count > s2.count) {
                    return -1;
                }

                return 0;
            }

            // sort the species by count in decending order
            $scope.speciesData.sort(compare);

            $scope.totalNumberOfSpecies = $scope.speciesData.length;

            // truncate string
            String.prototype.trunc = String.prototype.trunc ||
                function(n){
                    return this.length>n ? this.substr(0,n-1)+'...' : this;
                };

            // format input species to group species with lower count into 'others' category
            function formatResults(inSpecies) {
                var maxSpeciesShown = 4;

                if (inSpecies.length <= maxSpeciesShown) {
                    return inSpecies;
                } else {
                    var formattedResults = [];
                    var otherCount = 0;
                    $.each(inSpecies,function(i, val) {
                        if (i < maxSpeciesShown) {
                            formattedResults.push({'speciesName':val.speciesName.trunc(40), 'count':val.count});
                        } else {
                            otherCount += val.count;
                        }
                    });
                    // add others species
                    formattedResults.push({'speciesName': 'Others', 'count':otherCount});

                    return formattedResults;
                }
            }

            $scope.speciesData = formatResults($scope.speciesData);

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
                    return '<p>' + countStr.substring(0, countStr.length - 3) + ' PSMs for ' + key + '</p>';
                }
            };
        });

    }
]);
