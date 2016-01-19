'use strict';

/**
 * @ngdoc overview
 * @name Public
 * @description
 * # Public
 *
 * Main module of the application.
 */
angular
  .module('Public', [
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
    BASE_URL: 'http://localhost:3000',
    BASE_URL_API: 'http://localhost:3000/api'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/questions.html',
        controller: 'QuestionsCtrl',
        controllerAs: 'questions'
      })
      .when('/favorites', {
        templateUrl: 'views/favorites.html',
        controller: 'FavoritesCtrl',
        controllerAs: 'favorites'
      })
      .when('/sendquestion', {
        templateUrl: 'views/sendquestion.html',
        controller: 'SendquestionCtrl',
        controllerAs: 'sendquestion'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

