/**
 * @author Rui Wang
 *
 * The Statistics Service represents the PRIDE Cluster Web-Service through a series of singletons
 * that can be injected into other components (e.g. Controllers) in order to asynchronously access
 * the back-end data.
 *
 * Each singleton represents a web-service end point and can potentially define multiple operations.
 *
 */
var statsWsUrl = "//www.ebi.ac.uk/pride/ws/cluster/statistic";
//var statsWsUrl = "//localhost:9091/pride/ws/cluster/statistic";

var statsService = angular.module('prideClusterApp.statsService', ['ngResource']);

/* Services */
statsService.factory('Stats', ['$resource',
    function($resource){
        return $resource(
            statsWsUrl + '/general?callback=JSON_CALLBACK',
            {},
            {
                generalStats: {
                    method:'JSONP',
                    params:{},
                    isArray:false,
                    callback: 'JSON_CALLBACK'
                }
            }
        );
    }
]);

statsService.factory('ClusterPerSpecies', ['$resource',
    function($resource){
        return $resource(
            statsWsUrl + '/species/clusterCount?callback=JSON_CALLBACK',
            {},
            {
                getStats: {
                    method:'JSONP',
                    params:{},
                    isArray:false,
                    callback: 'JSON_CALLBACK'
                }
            }
        );
    }
]);

statsService.factory('PeptidePerSpecies', ['$resource',
    function($resource){
        return $resource(
            statsWsUrl + '/species/peptideCount?callback=JSON_CALLBACK',
            {},
            {
                getStats: {
                    method:'JSONP',
                    params:{},
                    isArray:false,
                    callback: 'JSON_CALLBACK'
                }
            }
        );
    }
]);

statsService.factory('OverlappingPeptidePerSpeciesPair', ['$resource',
    function($resource){
        return $resource(
            statsWsUrl + '/species/peptideOverlap/20?callback=JSON_CALLBACK',
            {},
            {
                getStats: {
                    method:'JSONP',
                    params:{},
                    isArray:false,
                    callback: 'JSON_CALLBACK'
                }
            }
        );
    }
]);


