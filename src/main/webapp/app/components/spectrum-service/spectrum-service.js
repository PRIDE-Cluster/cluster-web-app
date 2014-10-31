/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 */
var spectrumSummaryWsUrl = "http://127.0.0.1:9091/spectrumSummary";

/**
 * The Spectrum Service represents the PRIDE Cluster Web-Service through a series of singletons
 * that can be injected into other components (e.g. Controllers) in order to asynchronously access
 * the back-end data related to spectra.
 *
 * Each singleton represents a web-service end point and can potentially define multiple operations.
 *
 */
var spectrumService = angular.module('prideClusterApp.spectrumService', ['ngResource'])

/* Services */
spectrumService.factory('SpectrumSummary', ['$resource',
    function($resource){
        return $resource(spectrumSummaryWsUrl + '/:clusterId/list' + '?callback=JSON_CALLBACK', {}, {
            list: {method:'JSONP', params:{clusterId:'clusters'}, isArray:true, callback: 'JSON_CALLBACK'}
        });
    }
]);
