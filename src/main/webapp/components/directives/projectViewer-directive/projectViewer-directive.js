/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-project-viewer directive allows us to reuse a list of PRIDE Projects everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var projectViewerDirective = angular.module('prideClusterApp.projectViewerDirective', [])

projectViewerDirective.directive('prcProjectViewer', ['Projects', function(Projects) {
    function link(scope, element, attrs) {
         Projects.list(
            { clusterId: scope.clusterId },
            function(projects) {
                scope.projects = projects;
            }
        );
    }
    return {
        restrict: 'EA',
        scope: {
            clusterId: '=clusterid'
        },
        link: link,
        templateUrl: 'components/directives/projectViewer-directive/projectViewer-directive.html'
    };
}]);
