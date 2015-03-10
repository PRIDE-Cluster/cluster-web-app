/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-header directive allows us to reuse a cluster detail data element everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var clusterHeaderDirective = angular.module('prideClusterApp.clusterHeaderDirective', [])

clusterHeaderDirective.directive('prcClusterHeader', function() {
    return {
        restrict: 'EA',
        scope: { cluster : '=' },
        templateUrl: 'components/directives/clusterHeader-directive/clusterHeader-directive.html'
    };
});

