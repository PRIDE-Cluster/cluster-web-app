/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list directive allows us to reuse a list of cluster everywhere we want to show it (e.g.
 * in the clusterList-view)
 *
 * NOTE: the Cluster WS uses 0-based paging while the app uses 1-based paging
 *
 */

var projectListDirective = angular.module('prideClusterApp.projectListDirective', []);

projectListDirective.directive('prcProjectList', function () {
    return {
        restrict: 'E',
        scope: {
            sequence: '=sequence',
            modFilters: '=mod',
            projectFilters: '=project',
            pageNumber: '=page',
            pageSize: '=size'
        },
        controller: 'ProjectListDirectiveCtrl',
        templateUrl: 'components/directives/projectList-directive/projectList-directive.html'
    };
});


projectListDirective.controller('ProjectListDirectiveCtrl', ['$scope', '$routeParams', '$location', 'ClusterProjects', 'ngProgress',
    function ($scope, $routeParams, $location, ClusterProjects, ngProgress) {

        function updateState() {
            $location.search({
                sequence: $routeParams.sequence,
                modFilters: $scope.modFilters
            });
        }

        $scope.go = function(path) {
            $location.path(path);
        };

        ngProgress.start();

        ClusterProjects.get(
            {
                clusterId: $routeParams.clusterId,
                sequence: $scope.sequence,
                modifications: $scope.modFilters
            },
            function (data) {
                $scope.projects = [];
                $scope.totalResults = data.clusteredProjects.length;
                $scope.sequence = $routeParams.sequence;
                $scope.modFilters = $routeParams.modFilters;

                for (j = 0; j < data.clusteredProjects.length; j++) {
                    var originalProject = data.clusteredProjects[j];
                    var project = {};
                    project.accession = originalProject.accession;
                    project.title = originalProject.title;
                    project.numberOfPSMs = originalProject.numberOfPSMs;
                    project.species = originalProject.species.join();
                    project.tissues = originalProject.tissues.join();
                    project.diseases = originalProject.diseases.join();
                    project.instruments = originalProject.instruments.join();
                    project.searchEngines = originalProject.searchEngines.join();
                    $scope.projects.push(project);
                }


                ngProgress.set(100);
            }
        );

        ngProgress.complete();
    }
]);