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
 * - Total results
 *
 */

var appStateService = angular.module('prideClusterApp.appStateService', [])

appStateService.service('CurrentSearchState', [
    function() {
        this.current_search_query = "";
        this.current_search_pageNumber = 1;
        this.current_search_pageSize = 10;
        this.current_search_totalResults = 0;

        return {
            getQuery: function() { return this.current_search_query; },
            setQuery: function(q) { this.current_search_query = q; },
            getPageNumber: function() { return this.current_search_pageNumber; },
            setPageNumber: function(p) { this.current_search_pageNumber = p; },
            getPageSize: function() { return this.current_search_pageSize; },
            setPageSize: function(s) { this.current_search_pageSize = s; },
            getTotalResults: function() { return this.current_search_totalResults; },
            setTotalResults: function(n) { this.current_search_totalResults = n; }
        };
    }
]);
