/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-peptide-viewer directive allows us to reuse a list of Peptides everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var peptideViewerDirective = angular.module('prideClusterApp.peptideViewerDirective', [])

peptideViewerDirective.directive('prcPeptideViewer', ['ClusterPeptides', 'ngTableParams', function(ClusterPeptides, ngTableParams) {
    function link(scope, element, attrs) {
        ClusterPeptides.list(
            { clusterId: scope.clusterId },
            function(peptides) {

                scope.peptides = peptides;

                scope.peptideTableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10           // count per page
                }, {
                    total: peptides.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(peptides.slice((params.page() - 1) * params.count(), params.page() * params.count()));
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
