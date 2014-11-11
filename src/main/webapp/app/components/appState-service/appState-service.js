/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The State Service keeps the web application state across multiple angular modules. A module that needs
 * to access the state will be injected with the StateService service.
 *
 * Application state basically contains those parameters needed in the URL to build the specific view,
 * including when needed:
 * - Search query
 * - Page number
 * - Page size
 *
 */

var appStateService = angular.module('prideClusterApp.appStateService', [])

appStateService.factory('CurrentSearchState', [
    function() {
        var query = "";
        var page = 1;
        var pageSize = 10;
        return {
            getQuery: function() { return query; } ,
            setQuery: function(q) { query = q; },
            getPage: function() { return page; } ,
            setPage: function(p) { page = p; },
            getPageSize: function() { return pageSize; } ,
            setPageSize: function(s) { pageSize = s; }
        };
    }
]);
