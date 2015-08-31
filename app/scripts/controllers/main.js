define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name d3ProjectsApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the d3ProjectsApp
     */
    angular.module('d3ProjectsApp.controllers.MainCtrl', [])
        .controller('MainCtrl', function () {
          
            // Sandbox

            var wTime = 900;
            var wSLA = 700;
            var hSFLY = 250;
            var hSLA = 150;
            var fontSize = 12;
            var padding = 10;
            var labelOffset = 20 + fontSize;
            var yOffset = 3;
            var yScaleSLA = 1;
            var yScaleTime = 8;
            var thresholdTime = 10;      // 6 seconds
            var thresholdSLA = 98.6;
            var dataset = [];
            var times = [];
            var percentLabels = [0, 25, 50, 75, 100];
            var timeLabels = [0, 6, 12, 18, 24];
            // var timeLabels = [0, 5, 10, 15, 20, 25];
            var timeseriesSFLY = [
                ['12am', 5],
                ['1am', 2],
                ['2am', 7],
                ['3am', 3],
                ['4am', 9],
                ['5am', 4],
                ['6am', 24],
                ['7am', 6],
                ['8am', 2],
                ['9am', 7],
                ['10am', 5],
                ['11am', 3],
                ['12am', 22],
                ['1pm', 11],
                ['2pm', 1],
                ['3pm', 2],
                ['4pm', 7],
                ['5pm', 6],
                ['6pm', 5],
                ['7pm', 4],
                ['8pm', 5],
                ['9pm', 7],
                ['10pm', 15],
                ['11pm', 10]
            ];
            var dataSLA = [
                ['SFLY', 100.0],
                ['TP', 98.7],
                ['TL', 99.1],
                ['Treat', 78.5],
                ['WPD', 99.4],
                ['MYPUB', 100.0],
                ['BL', 67.9],
                ['Mobile', 72.8],
                ['SBS', 98.8]
            ];


            // SLAs
            
            var svgSLA = d3.select('.sla')
                .append('svg')
                    .attr('width', wSLA + labelOffset)
                    .attr('height', hSLA);

            // Add bars
            svgSLA.selectAll('rect')
                .data(dataSLA)
                .enter()
                .append('rect')
                    .attr('x', function (d, i) {    // d == data; i == index
                        return i * (wSLA / dataSLA.length) + labelOffset;
                    })
                    .attr('y', function (d) {
                        return hSLA - (d[1] * yScaleSLA) - fontSize - yOffset;
                    })
                    .attr('width', wSLA / dataSLA.length - padding)
                    .attr('height', function (d) {
                        return d[1] * yScaleSLA;
                    })
                    .attr('fill', function (d) {
                        if (d[1] >= thresholdSLA) {
                            return 'green';
                        } else {    // above threshold
                            return 'red';
                        }
                    });

            // Add x labels
            svgSLA.selectAll('text.x')
                .data(dataSLA)
                .enter()
                .append('text')
                .text(function (d) { return d[0]; })
                .attr({
                    'text-anchor': 'middle',
                    x: function (d, i) { return i * (wSLA / dataSLA.length) + ((wSLA / dataSLA.length - padding) / 2) + labelOffset; },
                    y: function () { return hSLA - yOffset; },
                    'font-family': "sans-serif",
                    'font-size': fontSize
                });

            // Add y labels
            svgSLA.selectAll('text.y')
                .data(percentLabels)
                .enter()
                .append('text')
                .text(function (d) { return d + '%'; })
                .attr({
                    'text-anchor': 'middle',
                    x: fontSize,
                    y: function (d, i) { return hSLA - d - fontSize; },
                    'font-family': "sans-serif",
                    'font-size': fontSize
                });


            // SFLY Home Page

            var svgSFLY = d3.select('.sfly')
                .append('svg')
                    .attr('width', wTime + labelOffset)
                    .attr('height', hSFLY);

            // Add bars
            svgSFLY.selectAll('rect')
                .data(timeseriesSFLY)
                .enter()
                .append('rect')
                    .attr('x', function (d, i) {    // d == data; i == index
                        return i * (wTime / timeseriesSFLY.length) + labelOffset;
                    })
                    .attr('y', function (d) {
                        return hSFLY - (d[1] * yScaleTime) - fontSize - yOffset;
                    })
                    .attr('width', wTime / timeseriesSFLY.length - padding)
                    .attr('height', function (d) {
                        return d[1] * yScaleTime;
                    })
                    .attr('fill', function (d) {
                        if (d[1] <= thresholdTime) {
                            return 'green';
                        } else {    // above threshold
                            return 'red';
                        }
                    });

            // Add x labels
            svgSFLY.selectAll('text.x')
                .data(timeseriesSFLY)
                .enter()
                .append('text')
                .text(function (d) { return d[0]; })
                .attr({
                    'text-anchor': 'middle',
                    x: function (d, i) { return i * (wTime / timeseriesSFLY.length) + ((wTime / timeseriesSFLY.length - padding) / 2) + labelOffset; },
                    y: function () { return hSFLY - yOffset; },
                    'font-family': "sans-serif",
                    'font-size': fontSize
                });

            // Add y labels
            svgSFLY.selectAll('text.y')
                .data(timeLabels)
                .enter()
                .append('text')
                .text(function (d) { return d + 's'; })
                .attr({
                    'text-anchor': 'middle',
                    x: fontSize,
                    y: function (d, i) {
                        var scaledY = d * yScaleTime; 
                        return hSFLY - scaledY - fontSize; },
                    'font-family': "sans-serif",
                    'font-size': fontSize
                });

            // Add y labels
            // svg.selectAll('text')
            //     .data(timeseries)
            //     .enter()
            //     .append('text')
            //     .text(function (d) { return d[0]; })
            //     .attr({
            //         'text-anchor': 'middle',
            //         x: function (d, i) { return i * (wTime / timeseries.length) + (wTime / timeseries.length - padding) / 2; },
            //         y: function () { return h - yOffset; },
            //         'font-family': "sans-serif",
            //         'font-size': fontSize
            //     });

        });
});
