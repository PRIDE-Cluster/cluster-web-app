/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-psm-viewer directive allows us to reuse a list of PSMs everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var psmViewerDirective = angular.module('prideClusterApp.psmViewerDirective', [])

psmViewerDirective.directive('prcPsmViewer', ['PsmSummary', function(PsmSummary) {
    function link(scope, element, attrs) {
        scope.psms = PsmSummary.list(
            { clusterId: scope.clusterId },
            function(psms) {}
        );
    }
    return {
        restrict: 'E',
        scope: {
            clusterId: '=clusterid'
        },
        link: link,
        templateUrl: 'components/directives/psmViewer-directive/psmViewer-directive.html'
    };
}]);
