/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-primary-peptide directive allows us to reuse a cluster detail data element everywhere
 * we want to show it (e.g. in the clusterDetail-view)
 *
 */

var clusterPrimaryPeptideDirective = angular.module('prideClusterApp.clusterPrimaryPeptideDirective', [])

clusterPrimaryPeptideDirective.directive('prcClusterPrimaryPeptide', function() {
    return {
        restrict: 'EA',
        scope: {
            sequence : '=',
            modifications: '='
        },
        templateUrl: 'components/directives/clusterPrimaryPeptide-directive/clusterPrimaryPeptide-directive.html'
    };
});

