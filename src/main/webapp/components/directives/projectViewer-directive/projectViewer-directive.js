/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-project-viewer directive allows us to reuse a list of PRIDE Projects everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var projectViewerDirective = angular.module('prideClusterApp.projectViewerDirective', []);

projectViewerDirective.directive('prcProjectViewer', ['Projects', function(Projects) {
    function link(scope, element, attrs) {
         Projects.get(
            { clusterId: scope.clusterId },
            function(projects) {
                scope.projects = projects.projects;
                scope.totalNumberOfProjects = scope.projects.length;
            }
        );
    }
    return {
        restrict: 'EA',
        scope: {
            clusterId: '=',
            totalNumberOfProjects: '='
        },
        link: link,
        templateUrl: 'components/directives/projectViewer-directive/projectViewer-directive.html'
    };
}]);
