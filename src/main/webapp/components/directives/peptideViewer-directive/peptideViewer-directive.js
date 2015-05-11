/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-peptide-viewer directive allows us to reuse a list of Peptides everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var peptideViewerDirective = angular.module('prideClusterApp.peptideViewerDirective', ['ngTable'])

peptideViewerDirective.directive('prcPeptideViewer', ['ClusterPeptides', 'ngTableParams', function(ClusterPeptides, ngTableParams) {
    function link(scope, element, attrs) {
        ClusterPeptides.get(
            { clusterId: scope.clusterId },
            function(peptides) {

                scope.peptides = peptides.clusteredPeptides;

                //function compare(p1, p2) {
                //    if (p1.numberOfPSMs < p2.numberOfPSMs) {
                //        return 1;
                //    }
                //
                //    if (p1.numberOfPSMs > p2.numberOfPSMs) {
                //        return -1;
                //    }
                //
                //    return 0;
                //}
                //
                //scope.peptides.sort(compare);

                // here we create a simplified modification list for each peptide that is used for
                // showing tooltips as required by the <prc-peptide-sequence-viewer> directive
                for (j = 0; j < scope.peptides.length; j++) {
                    var peptide = scope.peptides[j];
                    peptide.mods = [];
                    if (peptide.modifications!=null) {
                        for (i = 0; i < peptide.modifications.length; i++) {
                            peptide.mods[peptide.modifications[i].mainPosition - 1] = peptide.modifications[i].name;
                        }
                    }
                }

                scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10,           // count per page
                    sorting: {
                        numberOfPSMs: 'asc'
                    }
                }, {
                    total: scope.peptides.length, // length of data
                    getData: function($defer, params) {
                        scope.peptides_slice = scope.peptides.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        $defer.resolve(scope.peptides_slice);
                    }
                });
            }
        );
    }
    return {
        restrict: 'EA',
        scope: {
            clusterId: '=clusterid'
        },
        link: link,
        templateUrl: 'components/directives/peptideViewer-directive/peptideViewer-directive.html'
    };
}]);
