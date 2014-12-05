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
var clusterWsUrl = "http://wwwdev.ebi.ac.uk/pride/ws/cluster/cluster";

var clusterService = angular.module('prideClusterApp.clusterService', ['ngResource'])

/* Services */
clusterService.factory('ClusterSummary', ['$resource',
    function($resource) {
        return $resource(
                clusterWsUrl + '/search?q=:queryTerm&page=:pageNumber&size=:pageSize&callback=JSON_CALLBACK',
                {queryTerm:'', pageNumber:0, pageSize:10},
                {list: {method:'JSONP', params:{}, isArray:false, callback: 'JSON_CALLBACK'}}
        );
    }
]);
clusterService.factory('ClusterDetail', ['$resource',
    function($resource){
        return $resource(clusterWsUrl + '/:clusterId' + '?callback=JSON_CALLBACK', {}, {
            get: {method:'JSONP', params:{clusterId:'cluster'}, isArray:false, callback: 'JSON_CALLBACK'}
        });
    }
]);
clusterService.factory('ClusterSpecies', ['$resource',
    function($resource){
        return $resource(clusterWsUrl + '/:clusterId/species' + '?callback=JSON_CALLBACK',
            {},
            {get: {method:'JSONP', params:{clusterId:'cluster'}, isArray:false, callback: 'JSON_CALLBACK'}}
        );
    }
]);