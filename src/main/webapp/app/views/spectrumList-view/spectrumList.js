/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 */
var spectrumListModule = angular.module('prideClusterApp.spectrumListView', ['ngRoute'])

/**
 * Through routing we associate html templates with behaviour.
 * In this case the spectrumList.html template is associated with the SpectrumListCtrl when the app
 * requests the /spectra/:clusterId/list url
 */
clusterListModule.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/spectra/:clusterId/list', {
            templateUrl: 'app/views/spectrumList-view/spectrumList.html',
            controller: 'SpectrumListCtrl'
        });
    }
]);

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the spectrum list controller accesses the SpectrumSummary end point to get lists of Spectrum summaries
 * associated to a given Cluster. The list of spectra is assigned to a model object in order to be accessed later on
 * within the html template part of the view.
 */
clusterListModule.controller('SpectrumListCtrl', ['$scope', '$routeParams', 'SpectrumSummary',
    function($scope, $routeParams, SpectrumSummary) {
        $scope.clusters = SpectrumSummary.list({clusterId: $routeParams.clusterId}, function(spectra) {

        });
    }
]);

