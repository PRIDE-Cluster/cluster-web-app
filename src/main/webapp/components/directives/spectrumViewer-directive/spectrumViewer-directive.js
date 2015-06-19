/**
 * @author Jose A. Dianes <jdianes@ebi.ac.uk>
 *
 * The prc-spectrum-viewer directive allows us to reuse a spectra visualisations using SpeckTackle.
 *
 */
var spectrumViewerDirective = angular.module('prideClusterApp.spectrumViewerDirective', []);

spectrumViewerDirective.directive('prcSpectrumViewer', function () {
    return {
        restrict: 'E',
        controller: 'SpectrumViewerDirectiveCtrl',
        scope: {
            sourceId: "=",
            sequence: "=",
            modifications: "=",
            mz: "=",
            charge: "="
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
spectrumViewerDirective.controller('SpectrumViewerDirectiveCtrl', ['$scope', 'ConsensusSpectrumDetail',
    function ($scope, ConsensusSpectrumDetail) {

        var drawSpectrum = function() {
            var options = {
                "sequence": $scope.sequence,
                "staticMods": [],
                "variableMods": [],
                "ntermMod": 0, // additional mass to be added to the n-term
                "ctermMod": 0, // additional mass to be added to the c-term
                "peaks": [],
                "massError": 0.5,
                "scanNum": null,
                "fileName": null,
                "charge": $scope.charge,
                "precursorMz": $scope.mz,
                "ms1peaks": null,
                "ms1scanLabel": null,
                "precursorPeaks": null,
                "precursorPeakClickFn": null,
                "zoomMs1": false,
                "width": 800, 	  // width of the ms/ms plot
                "height": 600, 	  // height of the ms/ms plot
                "extraPeakSeries": [],
                "showIonTable": true,
                "showViewingOptions": true,
                "showOptionsTable": true,
                "showSequenceInfo": true,
                "labelImmoniumIons": true,
                "labelPrecursorPeak": true,
                "labelReporters": true,
                "showMassErrorPlot": true,
                "massErrorPlotDefaultUnit": 'Da'
            };

            $.each($scope.spectrum.peaks, function (i, val) {
                options.peaks.push([val.mz, val.intensity]);
            });

            $.each($scope.modifications, function (i, val) {
                if (val !== undefined) {
                    var modification = {
                        "index": val.mainPosition,
                        "modMass": val.monoMass,
                        "aminoAcid": $scope.sequence.charAt(val.mainPosition - 1)
                    };

                    options.variableMods.push(modification);
                }
            });

            $("#spectrum-viewer").specview(options);
        };

        ConsensusSpectrumDetail.get({clusterId: $scope.sourceId}, function (spectrum) {
            $scope.spectrum = spectrum;
        });

        $scope.$watch('sequence', function() {
            if ($scope.sequence !== undefined && $scope.spectrum !== undefined) {
                drawSpectrum();
            }
        });

        $scope.$watch('spectrum', function() {
            if ($scope.sequence !== undefined && $scope.spectrum !== undefined) {
                drawSpectrum();
            }
        });
}
])
;
