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
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
});
