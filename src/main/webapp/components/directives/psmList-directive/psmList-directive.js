/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list directive allows us to reuse a list of cluster everywhere we want to show it (e.g.
 * in the clusterList-view)
 *
 * NOTE: the Cluster WS uses 0-based paging while the app uses 1-based paging
 *
 */

var psmListDirective = angular.module('prideClusterApp.psmListDirective', []);

psmListDirective.directive('prcPsmList', function () {
    return {
        restrict: 'E',
        scope: {
            sequence: '=sequence',
            modFilters: '=mod',
            projectFilters: '=project',
            pageNumber: '=page',
            pageSize: '=size'
        },
        controller: 'PSMListDirectiveCtrl',
        templateUrl: 'components/directives/psmList-directive/psmList-directive.html'
    };
});


psmListDirective.controller('PSMListDirectiveCtrl', ['$scope', '$routeParams', '$location', 'ClusterPSMs', 'ngProgress',
    function ($scope, $routeParams, $location, ClusterPSMs, ngProgress) {

        function updateState() {
            $location.search({
                sequence: $routeParams.sequence,
                modFilters: $scope.modFilters,
                projectFilters: $scope.projectFilters,
                pageNumber: $routeParams.pageNumber,
                pageSize: $routeParams.pageSize
            });
        }

        $scope.go = function(path) {
            $location.path(path);
        };

        ngProgress.start();

        ClusterPSMs.get(
            {
                clusterId: $routeParams.clusterId,
                sequence: $scope.sequence,
                modifications: $scope.modFilters,
                projects: $scope.projectFilters,
                pageNumber: $scope.pageNumber - 1, // transform to 0-based paging
                pageSize: $scope.pageSize
            },
            function (psms) {
                $scope.psms = psms.psms;
                $scope.totalResults = psms.totalResults;
                $scope.sequence = $routeParams.sequence;
                $scope.modFilters = $routeParams.modFilters;
                $scope.projectFilters = $routeParams.projectFilters;
                $scope.pageNumber = $routeParams.page;
                $scope.pageSize = $routeParams.size;
                $scope.numPages = Math.floor($scope.totalResults / $scope.pageSize);

                console.log(psms);

                ngProgress.set(80);

                // Prepare modifications to be displayed
                for (var j = 0; j < $scope.psms.length; j++) {
                    var psm = $scope.psms[j];
                    psm.modificationNames = [];
                    for (var i = 0; i < psm.modifications.length; i++) {
                        psm.modificationNames[psm.modifications[i].mainPosition - 1] = {
                            "name" : psm.modifications[i].name
                        };
                    }
                }

                ngProgress.set(100);
            }
        );

        ngProgress.complete();
    }
]);