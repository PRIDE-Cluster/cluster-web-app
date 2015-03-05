/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The Project Service represents the PRIDE Cluster Web-Service through a series of singletons
 * that can be injected into other components (e.g. Controllers) in order to asynchronously access
 * the back-end data.
 *
 * Each singleton represents a web-service end point and can potentially define multiple operations.
 *
 */
var projectSummaryWsUrl = "http://wwwdev.ebi.ac.uk/pride/ws/cluster/project";

var projectService = angular.module('prideClusterApp.projectService', ['ngResource'])

/* Services */
projectService.factory('Projects', ['$resource',
    function($resource){
        return $resource(
                projectSummaryWsUrl + '/list/:clusterId' + '?callback=JSON_CALLBACK',
                {},
                {list: {method:'JSONP', params:{clusterId:'cluster'}, isArray:true, callback: 'JSON_CALLBACK'}}
        );
    }
]);

