var clusterWsUrl = "http://127.0.0.1:9091/cluster";

var prideClusterServices = angular.module('prideClusterServices', ['ngResource']);

prideClusterServices.factory('Cluster', ['$resource',
    function($resource){
        return $resource(clusterWsUrl + '/:clusterId' + '?callback=JSON_CALLBACK', {}, {
            get: {method:'JSONP', params:{clusterId:'clusters'}, isArray:false, callback: 'JSON_CALLBACK'}
        });
    }]);

prideClusterServices.factory('Clusters', ['$resource',
    function($resource){
        return $resource(clusterWsUrl + '/list' + '?callback=JSON_CALLBACK', {}, {
            query: {method:'JSONP', params:{}, isArray:true, callback: 'JSON_CALLBACK'}
        });
    }]);