'use strict';

/**
 * @ngdoc overview
 * @name chairmanApp
 * @description
 * # chairmanApp
 *
 * Main module of the application.
 */
angular
  .module('chairmanApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'btford.socket-io',
    'notifications',
    'angularMoment'
  ])
  .constant('CONFIG', {
    baseUrl: 'http://localhost:3000',
    baseUrlApi: 'http://localhost:3000/api',
    baseUrlQuestion: 'http://localhost:3000/api/question',

    JSON_STATUS_SUCCESS: 1,
    JSON_STATUS_WARNING: -1,
    JSON_STATUS_NOTICE: 0,
    JSON_STATUS_ERROR: -2,

    QUESTION_STATUS_CREATED: 0,
    QUESTION_STATUS_VALIDATED: 5,
    QUESTION_STATUS_DELETED: 10,
    QUESTION_STATUS_MERGED: 15,
    QUESTION_STATUS_ANSWERED: 20,
    QUESTION_STATUS_SENT: 25,
    QUESTION_STATUS_DISPLAYED: 30,

  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

