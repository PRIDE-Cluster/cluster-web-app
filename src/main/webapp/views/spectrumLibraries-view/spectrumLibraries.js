/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Each view must define its own routing and Controllers.
 */
var spectrumLibrariesView = angular.module('prideClusterApp.spectrumLibrariesView', ['ngRoute'])

/**
 * Through routing we associate html templates with behaviour.
 * In this case the spectrumLibrariesView.html template is associated with the SpectrumLibrariesController when the app
 * navigates to the search interface
 */
spectrumLibrariesView.config(
    function ($routeProvider) {
        $routeProvider.when('/libraries', {
            templateUrl: 'views/spectrumLibraries-view/spectrumLibraries.html',
            controller: 'SpectrumLibrariesViewCtrl'
        });
    }
);

/**
 * This controller is injected with scope. Right now is not really needed...
 */
spectrumLibrariesView.controller('SpectrumLibrariesViewCtrl', ['$scope', '$location', '$document', '$anchorScroll', 'SpectrumLibrary',
    function ($scope, $location, $document, $anchorScroll, SpectrumLibrary) {
        $scope.jumpTo = function(id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        };
        $scope.bytesToSize = function(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return 'n/a';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
        };

        $scope.asperaDownload = function(sourceURL) {
            $document.prop('aspera-web').startDownload(sourceURL + '?auth=no&bwcap=300000&targetrate=100p&policy=fair&enc=none');
        };

        $scope.latestRelease = SpectrumLibrary.latest({},function(spectrumLibraries){});
        console.log($scope.latestRelease)
    }
]);

