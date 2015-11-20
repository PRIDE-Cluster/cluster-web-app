/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Each view must define its own routing and Controllers.
 */
var resultsView = angular.module('prideClusterApp.resultsView', ['ngRoute'])

/**
 * Through routing we associate html templates with behaviour.
 * In this case the results.html template is associated with the SpectrumLibrariesController when the app
 * navigates to the search interface
 */
resultsView.config(
    function ($routeProvider) {
        $routeProvider.when('/results', {
            templateUrl: 'views/results-view/results.html',
            controller: 'ResultsViewCtrl'
        });
    }
);

/**
 * This controller is injected with scope. Right now is not really needed...
 */
resultsView.controller('ResultsViewCtrl', ['$scope', '$location', '$document', '$anchorScroll', 'resultFiles', 'ngProgress',
    function ($scope, $location, $document, $anchorScroll, resultFiles, ngProgress) {

        ngProgress.start();

        $scope.jumpTo = function(id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        };

        ngProgress.set(10);

        //$scope.bytesToSize = function(bytes) {
        //    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        //    if (bytes == 0) return 'n/a';
        //    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        //    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
        //};

        //ngProgress.set(20);
        //
        //$scope.asperaDownload = function(sourceURL) {
        //    $document.prop('aspera-web').startDownload(sourceURL + '?auth=no&bwcap=300000&targetrate=100p&policy=fair&enc=none');
        //};

        ngProgress.set(30);

        $scope.latestRelease = resultFiles.latest({},function(resultFiles){
            ngProgress.set(50);

            //function compare(s1, s2) {
            //    if (s1.numberOfSpectra < s2.numberOfSpectra) {
            //        return 1;
            //    }
            //
            //    if (s1.numberOfSpectra > s2.numberOfSpectra) {
            //        return -1;
            //    }
            //
            //    return 0;
            //}
            //
            //ngProgress.set(70);
            //
            //spectrumLibraries.spectrumLibraries.sort(compare)

            ngProgress.set(100);
        });

        ngProgress.complete();

        //$scope.hasImage = function(url) {
        //    console.log(url);
        //    var exist = true;
        //    //$http.get(url).
        //    //    success(function(data, status, headers, config) {
        //    //        exist = true;
        //    //    }).
        //    //    error(function(data, status, headers, config) {
        //    //        exist = false;
        //    //    });
        //
        //    return exist;
        //}
    }
]);

