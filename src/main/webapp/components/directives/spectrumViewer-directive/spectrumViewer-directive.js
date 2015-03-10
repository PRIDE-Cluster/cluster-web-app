/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-spectrum-viewer directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */
var spectrumWsUrl = "http://wwwdev.ebi.ac.uk/pride/ws/cluster/cluster";
var spectrumViewerDirective = angular.module('prideClusterApp.spectrumViewerDirective', [])

spectrumViewerDirective.directive('prcSpectrumViewer', function() {
    return {
        restrict: 'E',
        controller: 'SpectrumViewerDirectiveCtrl',
        scope: {
            sourceId: "=",
            xlabel: "@",
            ylabel: "@",
            isConsensus: "=",
            updateSpectrumSource: "="
        },
        templateUrl: 'components/directives/spectrumViewer-directive/spectrumViewer-directive.html'
    };
});

/**
 * Controllers are injected with routing parameters and a singleton to access the backend Web-Service.
 * In this case the cluster detail controller accesses the ClusterDetail end point to get details of
 * individual Clusters. These details are assigned to model objects in order to be accessed later on
 * within the html template part of the view.
 */
spectrumViewerDirective.controller('SpectrumViewerDirectiveCtrl', ['$scope',
    function($scope) {

        $scope.updateSpectrumSource = function(sourceId, isConsensus) {
            if (isConsensus) {
                // inject spectrum to SpeckTackle component
                var chart = st.chart          // new chart
                    .ms()                 // of type MS
                    .xlabel($scope.xlabel)        // x-axis label
                    .ylabel($scope.ylabel); // y-axis label
                chart.render("#spectrum-viewer");     // render chart

                var handle = st.data          // new handler
                    .set()                    // of type set
//                .ylimits([0, 1000])       // y-domain limits
                    .x("peaks.mz")            // x-accessor
                    .y("peaks.intensity");    // y-accessor

                // bind the data handler to the chart
                chart.load(handle);
                // load the spectrum
                handle.add(spectrumWsUrl + "/" + sourceId + "/consensus");
            } else {
//                $scope.spectrum = SpectrumDetail.get({spectrumId: sourceId}, function (spectrum) {
//                    // inject spectrum to SpeckTackle component
//
//                });
            }
        }

        $scope.updateSpectrumSource($scope.sourceId, $scope.isConsensus);

    }
]);
