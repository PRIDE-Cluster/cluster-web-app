/**
 * @author Noemi del Toro <ntoro@ebi.ac.uk>
 *
 * The Spectrum Libraries Service represents the PRIDE Cluster Web-Service through a series of singletons
 * that can be injected into other components (e.g. Controllers) in order to asynchronously access
 * the back-end data.
 *
 * Each singleton represents a web-service end point and can potentially define multiple operations.
 *
 */
var spectrumLibraryWsUrl = "//www.ebi.ac.uk/pride/ws/cluster/spectrumLibrary";
//var spectrumLibraryWsUrl = "//localhost:9091/pride/ws/cluster/spectrumLibrary";

var spectrumLibraryService = angular.module('prideClusterApp.spectrumLibraryService', ['ngResource']);

/* Services */
spectrumLibraryService.factory('SpectrumLibrary', ['$resource',
    function ($resource) {
        return $resource(
            spectrumLibraryWsUrl + '/latest/' + '?callback=JSON_CALLBACK',
            {},
            {
                latest: {
                    method: 'JSONP',
                    params: {},
                    isArray: false,
                    callback: 'JSON_CALLBACK'
                }
            }
        );
    }
]);

