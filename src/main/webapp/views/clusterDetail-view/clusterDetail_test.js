/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * Jasmine unit tests
 *
 */

describe('prideClusterApp.clusterDetailView module', function() {

    beforeEach(module('prideClusterApp'));

    describe('ClusterDetailsViewCtrl', function(){

        var scope, ctrl, routeParams;

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            routeParams = {clusterId:12345};

            ctrl = $controller('ClusterDetailViewCtrl',
                {$scope: scope, $routeParams: routeParams});
        }));

        it('should instantiate the controller', function() {
            expect(ctrl).toBeDefined();
        });

    });
});