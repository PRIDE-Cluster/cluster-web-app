/**
 * Created by rwang on 22/05/15.
 */

var chordPlotDirective = angular.module('prideClusterApp.chordPlotDirective', []);

chordPlotDirective.directive('prcChordPlot', function() {

    return {
        restrict: 'EA',
        scope: {
            id: '@',
            width: '@',
            height: '@',
            margin: '=',
            data: '='
        },
        link: function(scope, element, attrs) {

            scope.$watch('data', function() {
                if (scope.data) {

                    var chordPlotData = scope.data;

                    var margin = scope.margin;
                    var width = scope.width - margin.left - margin.right;
                    var height = scope.height - margin.top - margin.bottom;
                    var outerRadius = Math.min(width, height) / 2 - 10;
                    var innerRadius = outerRadius - 24;

                    var formatPercent = d3.format(".1%");

                    var arc = d3.svg.arc()
                        .innerRadius(innerRadius)
                        .outerRadius(outerRadius);

                    var layout = d3.layout.chord()
                        .padding(.04)
                        .sortSubgroups(d3.descending)
                        .sortChords(d3.ascending);

                    var path = d3.svg.chord()
                        .radius(innerRadius);

                    var svg = d3.select("#"+scope.id).append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("id", "circle")
                        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

                    svg.append("circle")
                        .attr("r", outerRadius);

                    // Compute the chord layout.
                    layout.matrix(chordPlotData.matrix);

                    // Add a group per neighborhood.
                    var group = svg.selectAll(".group")
                        .data(layout.groups)
                        .enter().append("g")
                        .attr("class", "group")
                        .on("mouseover", mouseover);


                    // Add a mouseover title.
                    group.append("title").text(function(d, i) {
                        return chordPlotData.labels[i].name;
                    });

                    // Add the group arc.
                    var groupPath = group.append("path")
                        .attr("id", function(d, i) { return "group" + i; })
                        .attr("d", arc)
                        .style("fill", function(d, i) { return chordPlotData.labels[i].color; });

                    // Add a text label.
                    var groupText = group.append("text")
                        .attr("x", 6)
                        .attr("dy", 15);

                    groupText.append("textPath")
                        .attr("xlink:href", function(d, i) { return "#group" + i; })
                        .text(function(d, i) { return chordPlotData.labels[i].name; });

                    // Remove the labels that don't fit. :(
                    groupText.filter(function(d, i) { return groupPath[0][i].getTotalLength() / 2 - 16 < this.getComputedTextLength(); })
                        .remove();

                    // Add the chords.
                    var chord = svg.selectAll(".chord")
                        .data(layout.chords)
                        .enter().append("path")
                        .attr("class", "chord")
                        .style("fill", function(d) { return chordPlotData.labels[d.source.index].color; })
                        .attr("d", path);

                    // Add an elaborate mouseover title for each chord.
                    chord.append("title").text(function(d) {
                        return chordPlotData.labels[d.source.index].name
                            + " → " + chordPlotData.labels[d.target.index].name
                            + ": " + formatPercent(d.source.value)
                            + "\n" + chordPlotData.labels[d.target.index].name
                            + " → " + chordPlotData.labels[d.source.index].name
                            + ": " + formatPercent(d.target.value);
                    });

                    function mouseover(d, i) {
                        chord.classed("fade", function(p) {
                            return p.source.index != i
                                && p.target.index != i;
                        });
                    }
                }
            });
        }
    };
});
