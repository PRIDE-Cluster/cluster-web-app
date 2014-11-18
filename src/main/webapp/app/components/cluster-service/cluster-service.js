/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The Cluster Service represents the PRIDE Cluster Web-Service through a series of singletons
 * that can be injected into other components (e.g. Controllers) in order to asynchronously acces
 * the back-end data.
 *
 * Each singleton represents a web-service end point and can potentially define multiple operations.
 *
 */
var clusterDetailWsUrl = "http://127.0.0.1:9091/clusterDetail";
var clusterSummaryWsUrl = "http://127.0.0.1:9091/clusterSummary";

var clusterService = angular.module('prideClusterApp.clusterService', ['ngResource'])

/* Services */
clusterService.factory('ClusterSummary', ['$resource',
    function($resource){
        return $resource(
                clusterSummaryWsUrl + '/list?q=:queryTerm&page=:pageNumber&size=:pageSize&callback=JSON_CALLBACK',
                {queryTerm:'', pageNumber:1, pageSize:10},
                {list: {method:'JSONP', params:{}, isArray:true, callback: 'JSON_CALLBACK'}}
        );
    }
]);
clusterService.factory('ClusterDetail', ['$resource',
    function($resource){
        return $resource(clusterDetailWsUrl + '/:clusterId' + '?callback=JSON_CALLBACK', {}, {
            get: {method:'JSONP', params:{clusterId:'cluster'}, isArray:false, callback: 'JSON_CALLBACK'}
        });
    }
]);
clusterService.factory('ClusterSpecies', ['$resource',
    function($resource){
        return $resource(clusterDetailWsUrl + '/:clusterId/species' + '?callback=JSON_CALLBACK',
            {},
            {get: {method:'JSONP', params:{clusterId:'cluster'}, isArray:true, callback: 'JSON_CALLBACK'}}
        );
    }
]);