/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The Cluster Service represents the PRIDE Cluster Web-Service through a series of singletons
 * that can be injected into other components (e.g. Controllers) in order to asynchronously access
 * the back-end data.
 *
 * Each singleton represents a web-service end point and can potentially define multiple operations.
 *
 * NOTE: the Cluster WS uses 0-based paging
 *
 */
var spectrumWsUrl = "http://www.ebi.ac.uk/pride/ws/cluster/cluster";
//var spectrumWsUrl = "http://localhost:9091/pride/ws/cluster/cluster";

var spectrumService = angular.module('prideClusterApp.spectrumService', ['ngResource']);

/* Services */
spectrumService.factory('ConsensusSpectrumDetail', ['$resource',
    function($resource){
        return $resource(
            spectrumWsUrl + '/:clusterId' + '/consensusSpectrum?callback=JSON_CALLBACK',
                {},
                {
                    get: {
                        method:'JSONP',
                        params:{clusterId:'cluster'},
                        isArray:false,
                        callback: 'JSON_CALLBACK'
                    }
                }
        );
    }
]);