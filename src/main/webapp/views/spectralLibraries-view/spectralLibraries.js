/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Each view must define its own routing and Controllers.
 */
var spectralLibrariesView = angular.module('prideClusterApp.spectralLibrariesView', ['ngRoute'])

/**
 * Through routing we associate html templates with behaviour.
 * In this case the spectralLibrariesView.html template is associated with the SpectralLibrariesController when the app
 * navigates to the search interface
 */
spectralLibrariesView.config(
    function ($routeProvider) {
        $routeProvider.when('/libraries', {
            templateUrl: 'views/spectralLibraries-view/spectralLibraries.html',
            controller: 'SpectralLibrariesViewCtrl'
        });
    }
);

/**
 * This controller is injected with scope. Right now is not really needed...
 */
//spectralLibrariesView.controller('SpectralLibrariesViewCtrl', ['$scope',
//    function ($scope) {
spectralLibrariesView.controller('SpectralLibrariesViewCtrl', ['$scope', 'SpectralLibrary',
    function ($scope, SpectralLibrary) {
        $scope.spectralLibraries = [
            {
                'species': 'Human',
                'taxId': 9606,
                'spectraNum': 200,
                'url': 'testUrl'
            },
            {
                'species': 'Mouse',
                'taxId': 10090,
                'spectraNum': 200,
                'url': 'testUrl'
            }
        ];

        //$scope.spectralLibraries = SpectralLibrary.latest({},function(spectralLibraries){});

    }
]);

