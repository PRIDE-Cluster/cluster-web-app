/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-key directive allows us to reuse a cluster detail data element everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var clusterKeyDirective = angular.module('prideClusterApp.clusterKeyDirective', []);

clusterKeyDirective.directive('prcClusterKey', function() {
    return {
        restrict: 'EA',
        scope: { cluster : '=' },
        templateUrl: 'components/directives/clusterKey-directive/clusterKey-directive.html',
        link: function(scope, element, attrs) {
            var maxRatio, numberOfSpectra;

            scope.maxRatioData = {
                "title": "",
                "subtitle": "",
                "ranges": [0.0, 1.0],
                "measures": [1.0],
                "markers": [scope.cluster.maxRatio]
            };
            maxRatio = scope.cluster.maxRatio;

            scope.toolTipContentFunction = function(){
                return function(key, x, y, e, graph) {
                    return '<p>Max Ratio is ' + scope.cluster.maxRatio + '</p>'
                }
            };
        }
    };
});
