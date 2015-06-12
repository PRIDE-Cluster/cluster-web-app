/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-list directive allows us to reuse a list of cluster everywhere we want to show it (e.g.
 * in the clusterList-view)
 *
 * NOTE: the Cluster WS uses 0-based paging while the app uses 1-based paging
 *
 */

var clusterListDirective = angular.module('prideClusterApp.clusterListDirective', []);

clusterListDirective.directive('prcClusterList', function () {
    return {
        restrict: 'E',
        scope: {
            queryTerm: '=query',
            pageNumber: '=page',
            pageSize: '=size',
            modFilters: '=mods',
            speciesFilters: '=species',
            sortField: '=sort',
            sortOrder: '=order'
        },
        controller: 'ClusterListDirectiveCtrl',
        templateUrl: 'components/directives/clusterList-directive/clusterList-directive.html'
    };
});


clusterListDirective.controller('ClusterListDirectiveCtrl', ['$scope', '$routeParams', '$location', 'ClusterSummary', 'ngProgress',
    function ($scope, $routeParams, $location, ClusterSummary, ngProgress) {

        $scope.maxSpecies = 5;
        $scope.maxMods = 5;

        function updateState() {
            $location.search({
                q: $routeParams.q,
                page: $routeParams.pageNumber,
                size: $routeParams.pageSize,
                modFilters: $scope.modFilters,
                speciesFilters: $scope.speciesFilters,
                sortField: $scope.sortField,
                sortOrder: $scope.sortOrder
            });
            console.log($location.search());
        }

        $scope.go = function(path) {
            $location.path(path);
        };

        $scope.isSorted = function(filedName) {
            return filedName === $scope.sortField;
        };

        $scope.isOrdered = function(fieldOrder) {
            return fieldOrder === $scope.sortOrder;
        };

        $scope.setSortField = function(fieldName) {
            if (fieldName === $scope.sortField) {
                // change sort order
                if ($scope.sortOrder === "desc") {
                    $scope.sortOrder = "asc";
                } else {
                    $scope.sortOrder = "desc";
                }
            } else {
                $scope.sortField = fieldName;
                $scope.sortOrder = "desc";
            }

            updateState();
        };

        $scope.updateSpeciesFilters = function (value) {

            if (value.selected === true) {
                $scope.speciesFilters.push(value.name);
            } else {
                $scope.speciesFilters = $scope.speciesFilters.filter(function (item) {
                    return item !== value.name;
                });
            }

            updateState();
        };

        $scope.updateModFilters = function (value) {

            if (value.selected === true) {
                $scope.modFilters.push(value.name);
            }
            else {
                $scope.modFilters = $scope.modFilters.filter(function (item) {
                    return item !== value.name;
                });
            }

            updateState();
        };


        ngProgress.start();

        ClusterSummary.list(
            {
                queryTerm: $scope.queryTerm,
                pageNumber: $scope.pageNumber - 1, // transform to 0-based paging
                pageSize: $scope.pageSize,
                modFilters: $scope.modFilters,
                speciesFilters: $scope.speciesFilters,
                sortField: $scope.sortField,
                sortOrder: $scope.sortOrder
            },
            function (clusters) {
                $scope.clusters = clusters.results;
                $scope.totalResults = clusters.totalResults;
                $scope.query = $routeParams.q;
                $scope.pageNumber = $routeParams.page;
                $scope.pageSize = $routeParams.size;
                $scope.numPages = Math.floor($scope.totalResults / $scope.pageSize);


                //Prepare facets, todo change it in the ws to avoid the transformation
                var speciesObject = clusters.facetsMap.species_names;
                var modObject = clusters.facetsMap.mod_synonyms;

                var item;
                $scope.speciesFacets = [];
                $scope.modFacets = [];

                ngProgress.set(10);

                for (var mod in modObject) {
                    if (modObject.hasOwnProperty(mod)) {
                        item = {};
                        item.name = mod;
                        item.count = modObject[mod];
                        item.selected = false;
                        $scope.modFacets.push(item);
                    }
                }

                ngProgress.set(20);

                for (var species in speciesObject) {
                    if (speciesObject.hasOwnProperty(species)) {
                        item = {};
                        item.name = species;
                        item.count = speciesObject[species];
                        item.selected = false;
                        $scope.speciesFacets.push(item);
                    }
                }

                ngProgress.set(30);

                if (!$routeParams.speciesFilters) {
                    $routeParams.speciesFilters = [];
                    $scope.speciesFilters = [];
                } else {
                    $scope.speciesFilters = angular.fromJson($routeParams.speciesFilters);
                }

                ngProgress.set(50);

                for (var species in $scope.speciesFacets) {
                    for (var speciesFilter in $scope.speciesFilters) {
                        if ($scope.speciesFacets[species].name === $scope.speciesFilters[speciesFilter]) {
                            $scope.speciesFacets[species].selected = true;
                            break;
                        }
                    }
                }

                ngProgress.set(60);

                if (!$routeParams.modFilters) {
                    $routeParams.modFilters = [];
                    $scope.modFilters = [];
                } else {
                    $scope.modFilters = angular.fromJson($routeParams.modFilters);
                }

                ngProgress.set(70);

                for (var mod in $scope.modFacets) {
                    for (var modFilter in $scope.modFilters) {
                        if ($scope.modFacets[mod].name === $scope.modFilters[modFilter]) {
                            $scope.modFacets[mod].selected = true;
                            break
                        }
                    }
                }

                ngProgress.set(80);

                // Prepare modifications to be displayed
                for (var j = 0; j < $scope.clusters.length; j++) {
                    var cluster = $scope.clusters[j];
                    cluster.modificationNames = [];
                    for (var i = 0; i < cluster.modifications.length; i++) {
                        cluster.modificationNames[cluster.modifications[i].mainPosition - 1] = {
                            "name" : cluster.modifications[i].name
                        };
                    }
                }

                ngProgress.set(100);
            }
        );

        ngProgress.complete();
    }
]);