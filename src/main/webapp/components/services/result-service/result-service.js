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
var resultWsUrl = "//www.ebi.ac.uk/pride/ws/cluster/result";
//var spectrumLibraryWsUrl = "//localhost:9091/pride/ws/cluster/spectrumLibrary";

var resultService = angular.module('prideClusterApp.resultService', ['ngResource']);

/* Services */
resultService.factory('resultFiles', ['$resource',
    function ($resource) {
        return $resource(
            resultWsUrl + '/latest/' + '?callback=JSON_CALLBACK',
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

