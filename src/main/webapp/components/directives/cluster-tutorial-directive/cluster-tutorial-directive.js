/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-project-viewer directive allows us to reuse a list of PRIDE Projects everywhere we want to show it (e.g.
 * in the clusterDetail-view)
 *
 */

var clusterTutorialDirective = angular.module('prideClusterApp.clusterTutorialDirective', []);

clusterTutorialDirective.directive('prcTutorialViewer',function() {
    return {
        restrict: 'EA',
        scope: {
            slides: '='
        },
        templateUrl: 'components/directives/cluster-tutorial-directive/cluster-tutorial-directive.html',
        controller : "ClusterTutorialCtrl"
    };
});

clusterTutorialDirective.controller("ClusterTutorialCtrl", function($scope) {
    $scope.slides = [
        {
            'imageName':'tutorial-1.png',
            'content' : 'PRIDE Cluster clusters all MS/MS spectra submitted to the PRIDE Archive repository using spectrum clustering algorithms.'
        },
        {
            'imageName':'tutorial-2.png',
            'content': 'Filter to keep high quality clusters that provide consensus spectrum and consensus peptide identification.'
        },
        {
            'imageName':'tutorial-3.png',
            'content': 'Load clusters into PRIDE Cluster database for web access and spectrum libraries for spectrum search tools.'
        }
    ];
});

