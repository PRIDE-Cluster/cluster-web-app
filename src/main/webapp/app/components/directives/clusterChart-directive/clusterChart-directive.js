/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-cluster-chart directive allows us to reuse a chart of cluster everywhere we want to show it (e.g.
 * in the clusterChart-view)
 *
 */

var clusterChartDirective = angular.module('prideClusterApp.clusterChartDirective', [])

clusterChartDirective.directive('prcClusterChart', function(ClusterSummary, CurrentSearchState) {

    return {
        restrict: 'E',
        scope: {
            queryTerm: '=query',
            pageNumber: '=page',
            pageSize: '=size'
        },
        controller: 'ClusterChartDirectiveCtrl',
        templateUrl: 'components/directives/clusterChart-directive/clusterChart-directive.html'
    };
});


clusterChartDirective.controller('ClusterChartDirectiveCtrl', ['$scope', 'ClusterSummary', 'CurrentSearchState',
    function($scope, ClusterSummary, CurrentSearchState) {

        ClusterSummary.list(
            { queryTerm:$scope.queryTerm, pageNumber:$scope.pageNumber, pageSize:$scope.pageSize },
            function(clusters) {

                CurrentSearchState.setTotalResults(clusters.totalResults);
                console.log("[prcClusterChart-directive] Total results set to " + CurrentSearchState.getTotalResults())
                $scope.totalResults = CurrentSearchState.getTotalResults();
                $scope.query = CurrentSearchState.getQuery();
                $scope.totalItems = CurrentSearchState.getTotalResults();
                $scope.pageNumber = CurrentSearchState.getPageNumber();
                $scope.pageSize = CurrentSearchState.getPageSize();


                nv.addGraph(function() {
                    var chart = nv.models.scatterChart()
                        .showDistX(true)    //showDist, when true, will display those little distribution lines on the axis.
                        .showYAxis(true)
                        .showControls(false)
                        .showLegend(true)
                        .transitionDuration(350)
                        .color(d3.scale.category10().range())
                        .sizeRange([10,1000])
                        .forceX([0.0,1.0])
                        .forceY([1,CurrentSearchState.getPageSize()]);

                    //Configure how the tooltip looks.
                    chart.tooltipYContent(null);
                    chart.tooltipContent(function(key, x, y) {
                        var item = clusters.pageSize-y;
                        return '<h4>'+ clusters.results[item].peptideSequence + '</h4>' +
                        '<h5>'+ clusters.results[item].numberOfSpectra + ' spectra</h5>';
                    });

                    //Axis settings
                    chart.xAxis.tickFormat(d3.format('.02f'));
                    chart.xAxis.axisLabel("Max. Peptide Ratio");
                    chart.yAxis.axisLabel("Cluster Relevancy");
                    chart.yAxis.tickValues(false);
                    chart.yAxis.showMaxMin(false);
                    //We want to show shapes other than circles.
                    chart.scatter.onlyCircles(false);

                    var myData = asChartData(
                        clusters.results,
                        CurrentSearchState.getTotalResults(),
                        CurrentSearchState.getPageSize()
                    );
                    d3.select('#clusterChart svg')
                        .datum(myData)
                        .call(chart);

                    nv.utils.windowResize(chart.update);

                    return chart;
                });

            }
        );


    }
]);

function asChartData(results, numResults, pageSize) {
    var maxY = Math.min(numResults, pageSize);

    var chartData = [
        {
            "key":"High Quality",
            "values":[]
        },
        {
            "key":"Medium Quality",
            "values":[]
        },
        {
            "key":"Low Quality",
            "values":[]
        }
    ];
    for (i = 0; i<results.length; i++) {
        chartCluster = {
            "x":results[i].maxRatio,
            "y": (maxY - i),
            "size":(results[i].numberOfSpectra * 50)
        };
        if (results[i].clusterQuality == 'HIGH') {
            chartData[0].values.push(chartCluster);
        } else if (results[i].clusterQuality == 'MEDIUM') {
            chartData[1].values.push(chartCluster);
        } else if (results[i].clusterQuality == 'LOW') {
            chartData[2].values.push(chartCluster);
        }
    }

    return chartData;
}

