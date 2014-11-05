/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-spectrum-viewer directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */
var clusterDetailWsUrl = "http://127.0.0.1:9091/clusterDetail";
var spectrumViewerDirective = angular.module('prideClusterApp.spectrumViewerDirective', [])

spectrumViewerDirective.directive('prcSpectrumViewer', function() {
    function link(scope, element, attrs) {

    }
    return {
        restrict: 'E',
        scope: {
            viewerId : "=viewerid",
            sourceId : '=sourceid',
            isConsensus : '=isconsensus'
        },
        controller: 'SpectrumViewerDirectiveCtrl',
        link: link,
        templateUrl: 'app/components/spectrumViewer-directive/spectrumViewer-directive.html'
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

        if ($scope.isConsensus) {
            $scope.title = "Consensus Spectrum";
            // inject spectrum to SpeckTackle component
            var chart = st.chart          // new chart
                .ms()                 // of type MS
                .xlabel("M/Z")        // x-axis label
                .ylabel("Intensity"); // y-axis label
            chart.render("#spectrum-viewer");     // render chart

            var handle = st.data          // new handler
                .set()                    // of type set
//                .ylimits([0, 1000])       // y-domain limits
                .x("peaks.mz")            // x-accessor
                .y("peaks.intensity");    // y-accessor

            // bind the data handler to the chart
            chart.load(handle);
            // load the spectrum
            handle.add(clusterDetailWsUrl + "/" + $scope.sourceId + "/consensus");
        } else {
            $scope.spectrum = SpectrumDetail.get({spectrumId: $scope.sourceId}, function (spectrum) {
                // inject spectrum to SpeckTackle component

            });
        }
    }
]);
