/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Jasmine unit tests
 *
 */

describe('prideClusterApp.clusterListView module', function() {

    beforeEach(module('prideClusterApp'));
    beforeEach(module('prideClusterApp.appStateService'));

    describe('ClusterListViewCtrl', function(){

        var scope, ctrl, routeParams;

        beforeEach(inject(function(CurrentSearchState, $rootScope, $controller) {
            scope = $rootScope.$new();
            routeParams = {q:"", page:1, pageSize:10};

            ctrl = $controller('ClusterListViewCtrl',
                {$scope: scope, $routeParams: routeParams, CurrentSearchState: CurrentSearchState});
        }));

        it('should be defined', function() {
            expect(ctrl).toBeDefined();
        });

    });
});