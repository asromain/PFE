'use strict';

/**
 * @ngdoc service
 * @name Public.questionsService
 * @description
 * # questionsService
 * Service in the Public.
 */

angular.module('Public')
    .factory('QuestionsService', function($resource) {
        return $resource('http://localhost:3000/api/question/:id', {},
        {
            'get':    { method: 'GET', isArray:true },
            'query':  { method: 'GET', isArray:true },
            'save':   { method: 'POST' },
            'remove': { method: 'DELETE' },
            'delete': { method: 'DELETE' },
            'update': { method: 'PUT' }
        });
    });
