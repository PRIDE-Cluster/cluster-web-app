/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-peptide-sequence-viewer directive allows us to reuse a peptide sequence view
 * we want to show it (e.g. in the clusterDetail-view)
 *
 */

var peptideSequenceViewer = angular.module('prideClusterApp.peptideSequenceViewerDirective', [])

peptideSequenceViewer.directive('prcPeptideSequenceViewer', function() {
    return {
        restrict: 'EA',
        scope: {
            sequence : '=',
            modifications: '=',
            charge: '=',
            mz: '='
        },
        templateUrl: 'components/directives/peptideSequenceViewer-directive/peptideSequenceViewer-directive.html'
    };
});

