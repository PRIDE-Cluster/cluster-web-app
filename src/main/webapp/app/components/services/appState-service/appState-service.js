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

appStateService.service('CurrentSearchState',
    function() {
        console.log("[CurrentSearchState] starting service")
        var current_search_query = "";
        var current_search_pageNumber = 1;
        var current_search_pageSize = 10;
        var current_search_totalResults = 0;

        this.getQuery = function() { return current_search_query; };
        this.setQuery = function(q) { current_search_query = q; };
        this.getPageNumber = function() {
            console.log("[CurrentSearchState] page request: " + current_search_pageNumber);
            return current_search_pageNumber;
        };
        this.setPageNumber = function(p) { current_search_pageNumber = p; console.log("[CurrentSearchState] page set to " + current_search_pageNumber) };
        this.getPageSize = function() {
            return current_search_pageSize; };
        this.setPageSize = function(s) { current_search_pageSize = s; };
        this.getTotalResults = function() { return current_search_totalResults; };
        this.setTotalResults = function(n) { current_search_totalResults = n; };

    }
);
