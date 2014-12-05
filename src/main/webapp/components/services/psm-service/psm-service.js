/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The PSM Service represents the PRIDE Cluster Web-Service through a series of singletons
 * that can be injected into other components (e.g. Controllers) in order to asynchronously access
 * the back-end data.
 *
 * Each singleton represents a web-service end point and can potentially define multiple operations.
 *
 */
var psmSummaryWsUrl = "http://wwwdev.ebi.ac.uk/pride/ws/cluster/psm";

var psmService = angular.module('prideClusterApp.psmService', ['ngResource'])

/* Services */
psmService.factory('PsmSummary', ['$resource',
    function($resource){
        return $resource(
                psmSummaryWsUrl + '/list/:clusterId' + '?callback=JSON_CALLBACK',
                {},
                {list: {method:'JSONP', params:{clusterId:'cluster'}, isArray:true, callback: 'JSON_CALLBACK'}}
        );
    }
]);

