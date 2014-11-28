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

appStateService.factory('CurrentSearchState', function() {
    var service = {
        state: {},

//        this.current_search_view_path = "/";
//    this.current_search_query = "";
//    this.current_search_pageNumber = 1;
//    this.current_search_pageSize = 10;
//    this.current_search_totalResults = 0;

        getViewPath: function () {
            return service.state['current_search_view_path'];
        },
        setViewPath: function (p) {
            service.state['current_search_view_path'] = p;
        },
        getQuery: function () {
            return service.state['current_search_query'];
        },
        setQuery: function (q) {
            service.state['current_search_query'] = q;
        },
        getPageNumber: function () {
            return service.state['current_search_pageNumber'];
        },
        setPageNumber: function (p) {
            service.state['current_search_pageNumber'] = p;
        },
        getPageSize: function () {
            return service.state['current_search_pageSize'];
        },
        setPageSize: function (s) {
            service.state['current_search_pageSize'] = s;
        },
        getTotalResults: function () {
            return service.state['current_search_totalResults'];
        },
        setTotalResults: function (n) {
            service.state['current_search_totalResults'] = n;
        }
    } /* service */

    return service;
 });
