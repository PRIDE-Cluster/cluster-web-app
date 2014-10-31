var clusterDetailWsUrl = "http://127.0.0.1:9091/clusterDetail";
var clusterSummaryWsUrl = "http://127.0.0.1:9091/clusterSummary";

var clusterService = angular.module('prideClusterApp.clusterService', ['ngResource'])

// SERVICES
clusterService.factory('ClusterSummary', ['$resource',
    function($resource){
        return $resource(clusterSummaryWsUrl + '/list' + '?callback=JSON_CALLBACK', {}, {
            list: {method:'JSONP', params:{}, isArray:true, callback: 'JSON_CALLBACK'}
        });
    }
]);
clusterService.factory('ClusterDetail', ['$resource',
    function($resource){
        return $resource(clusterDetailWsUrl + '/:clusterId' + '?callback=JSON_CALLBACK', {}, {
            get: {method:'JSONP', params:{clusterId:'clusters'}, isArray:false, callback: 'JSON_CALLBACK'}
        });
    }
]);