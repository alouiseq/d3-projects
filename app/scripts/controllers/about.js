define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name d3ProjectsApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the d3ProjectsApp
   */
  angular.module('d3ProjectsApp.controllers.AboutCtrl', [])
    .controller('AboutCtrl', function () {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
});
