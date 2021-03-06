/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 * @author Rui Wang <rwang@ebi.ac.uk>
 *
 * The prc-peptide-viewer directive allows us to reuse a list of Peptides everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var peptideViewerDirective = angular.module('prideClusterApp.peptideViewerDirective', ['ngTable']);

peptideViewerDirective.directive('prcPeptideViewer', function () {
    return {
        restrict: 'EA',
        scope: {
            clusterId: '=',
            totalNumberOfPeptides: '='
        },
        controller: 'PeptideViewerCtrl',
        //link: link,
        templateUrl: 'components/directives/peptideViewer-directive/peptideViewer-directive.html'
    };
});

peptideViewerDirective.controller("PeptideViewerCtrl", ['$scope', '$filter', 'ClusterPeptides', 'ngTableParams', '$location',
    function ($scope, $filter, ClusterPeptides, ngTableParams, $location) {
        // init an empty array of peptides
        $scope.peptides = [];

        // init total number of peptides
        $scope.totalNumberOfPeptides = 0;

        $scope.isConsensusPeptide = function (peptide) {
            return peptide.consensusPeptide.toString() === 'true';
        };

        $scope.showPSMs = function (sequence, modifications, projectAccession) {
            var psmPath = 'id/' + $scope.clusterId + '/psm';
            if (modifications === "" || modifications === undefined) {
                modifications = "NONE";
            }

            $location.url(psmPath).search({
                sequence: sequence,
                modFilters: modifications,
                projectFilters: projectAccession,
                pageNumber: 1,
                pageSize: 20
            });
        };

        $scope.showProjects = function (sequence, modifications) {
            var projectPath = 'id/' + $scope.clusterId + '/project';
            if (modifications === "" || modifications === undefined) {
                modifications = "NONE";
            }

            $location.url(projectPath).search({
                sequence: sequence,
                modFilters: modifications
            });
        };

        // function to be called at init to get peptides using remote web service
        $scope.getPeptides = function () {
            ClusterPeptides.get(
                {clusterId: $scope.clusterId},
                function (data) {

                    $scope.peptides = data.clusteredPeptides;


                    // here we create a simplified modification list for each peptide that is used for
                    // showing tooltips as required by the <prc-peptide-sequence-viewer> directive
                    var totalNumberOfPsms = 0;
                    for (j = 0; j < $scope.peptides.length; j++) {
                        var peptide = $scope.peptides[j];

                        peptide.mods = [];
                        peptide.modAsString = '';
                        if (peptide.modifications != null) {
                            for (i = 0; i < peptide.modifications.length; i++) {
                                peptide.mods[peptide.modifications[i].mainPosition - 1] = {
                                    "name": peptide.modifications[i].name
                                };
                                if (peptide.modAsString.length > 0) {
                                    peptide.modAsString += ',';
                                }
                                peptide.modAsString += peptide.modifications[i].modificationAsString;
                            }
                        }
                        totalNumberOfPsms += peptide.numberOfPSMs;
                    }

                    for (j = 0; j < $scope.peptides.length; j++) {
                        peptide = $scope.peptides[j];
                        peptide.psmPercentage = peptide.numberOfPSMs / totalNumberOfPsms;
                    }

                    $scope.totalNumberOfPeptides = $scope.peptides.length;

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
            total: $scope.peptides.length, // length of data
            getData: function ($defer, params) {

                // use build-in angular filter
                var orderedData = params.sorting() ?
                    $filter('orderBy')($scope.peptides, params.orderBy()) :
                    data;

                params.total(orderedData.length);
                $scope.peptides_slice = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                $defer.resolve($scope.peptides_slice);
            }
        });
    }]);