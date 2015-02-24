/**
 * @author Noemi del Toro <ntoro@ebi.ac.uk>
 *
 * The Spectral Libraries Service represents the PRIDE Cluster Web-Service through a series of singletons
 * that can be injected into other components (e.g. Controllers) in order to asynchronously access
 * the back-end data.
 *
 * Each singleton represents a web-service end point and can potentially define multiple operations.
 *
 */
var spectralLibraryWsUrl = "http://wwwdev.ebi.ac.uk/pride/ws/cluster/spectralLibrary";

var spectralLibraryService = angular.module('prideClusterApp.spectralLibraryService', ['ngResource']);

/* Services */
spectralLibraryService.factory('SpectralLibrary', ['$resource',
    function ($resource) {
        return $resource(
            spectralLibraryWsUrl + '/list/:releaseDate' + '?callback=JSON_CALLBACK',
            {},
            {
                list: {
                    method: 'JSONP',
                    params: {
                        releaseDate: 'date'
                    },
                    isArray: true,
                    callback: 'JSON_CALLBACK'
                },
                latest: {
                    method: 'JSONP',
                    params: {},
                    url: spectralLibraryWsUrl + '/current/' + '?callback=JSON_CALLBACK',
                    isArray: true,
                    callback: 'JSON_CALLBACK'
                }
            }
        );
    }
]);

