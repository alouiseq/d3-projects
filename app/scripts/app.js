/*jshint unused: vars */
define(['angular', 'controllers/main', 'controllers/about']/*deps*/, function (angular, MainCtrl, AboutCtrl)/*invoke*/ {
  'use strict';

  /**
   * @ngdoc overview
   * @name d3ProjectsApp
   * @description
   * # d3ProjectsApp
   *
   * Main module of the application.
   */
  return angular
    .module('d3ProjectsApp', ['d3ProjectsApp.controllers.MainCtrl',
'd3ProjectsApp.controllers.AboutCtrl',
/*angJSDeps*/
    'ngResource',
    'ngRoute'

  ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl',
          controllerAs: 'about'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
});
