/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-psm-list directive allows us to reuse a list of PSMs everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var psmListDirective = angular.module('prideClusterApp.psmListDirective', [])

psmListDirective.directive('prcPsmList', ['PsmSummary', function(PsmSummary) {
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
        templateUrl: 'components/directives/psmList-directive/psmList-directive.html'
    };
}]);
