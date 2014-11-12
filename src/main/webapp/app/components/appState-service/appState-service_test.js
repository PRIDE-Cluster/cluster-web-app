/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Jasmine unit tests
 *
 */

describe('prideClusterApp.appStateService module', function() {

    beforeEach(module('prideClusterApp'));

    describe('CurrentSearchState', function(){

        var searchState;

        // Test service availability
        it('should be defined', inject(function(CurrentSearchState) {
            expect(CurrentSearchState).toBeDefined();
        }));

        it('should keep the query term', inject(function(CurrentSearchState) {
            var testQuery = "test query terms";
            CurrentSearchState.setQuery(testQuery);
            expect(CurrentSearchState.getQuery()).toEqual(testQuery);
        }));

        it('should keep the page number', inject(function(CurrentSearchState) {
            var testPageNumber = 1234;
            CurrentSearchState.setPage(testPageNumber);
            expect(CurrentSearchState.getPage()).toEqual(testPageNumber);
        }));

        it('should keep the page size', inject(function(CurrentSearchState) {
            var testPageSize = 20;
            CurrentSearchState.setPageSize(testPageSize);
            expect(CurrentSearchState.getPageSize()).toEqual(testPageSize);
        }));

    });
});