/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 * @author Rui Wang <rwang@ebi.ac.uk>
 *
 * The prc-peptide-viewer directive allows us to reuse a list of Peptides everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var projectViewerDirective = angular.module('prideClusterApp.projectViewerDirective', ['ngTable']);

projectViewerDirective.directive('prcProjectViewer', function () {
    return {
        restrict: 'EA',
        scope: {
            clusterId: '=',
            totalNumberOfProjects: '='
        },
        controller: 'ProjectViewerCtrl',
        //link: link,
        templateUrl: 'components/directives/projectViewer-directive/projectViewer-directive.html'
    };
});

projectViewerDirective.controller("ProjectViewerCtrl", ['$scope', '$filter', 'ClusterProjects', 'ngTableParams', function($scope, $filter, ClusterProjects, ngTableParams) {
    // init an empty array of peptides
    $scope.projects = [];

    // init total number of peptides
    $scope.totalNumberOfProjects = 0;



    // function to be called at init to get peptides using remote web service
    $scope.getProjects = function() {
        ClusterProjects.get(
            {clusterId: $scope.clusterId},
            function (data) {

                $scope.projects = [];

                for (j = 0; j < data.clusteredProjects.length; j++) {
                    var originalProject = data.clusteredProjects[j];
                    var project = {};
                    project.accession = originalProject.accession;
                    project.numberOfPSMs = originalProject.numberOfPSMs;
                    project.species = originalProject.species.join();
                    project.tissues = originalProject.tissues.join();
                    project.instruments = originalProject.instruments.join();
                    $scope.projects.push(project);
                }

                // here we create a simplified modification list for each peptide that is used for
                // showing tooltips as required by the <prc-peptide-sequence-viewer> directive
                var totalNumberOfPsms = 0;
                for (j = 0; j < $scope.projects.length; j++) {
                    project = $scope.projects[j];
                    totalNumberOfPsms += project.numberOfPSMs;
                }

                for (j = 0; j < $scope.projects.length; j++) {
                    project = $scope.projects[j];
                    project.psmPercentage = project.numberOfPSMs / totalNumberOfPsms;
                }

                $scope.totalNumberOfProjects = $scope.projects.length;

                $scope.tableParams.reload();
            }
        );


    };

    // setup ng-table with sorting and pagination
    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 8,           // count per page
        sorting: {
            numberOfPSMs: 'desc'
        }
    }, {
        total: $scope.projects.length, // length of data
        getData: function($defer, params) {

            // use build-in angular filter
            var orderedData = params.sorting() ?
                $filter('orderBy')($scope.projects, params.orderBy()) :
                data;

            params.total(orderedData.length);
            $scope.projects_slice = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            $defer.resolve($scope.projects_slice);
        }
    });
}]);