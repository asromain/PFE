'use strict';

/**
 * @ngdoc service
 * @name Public.ResponsesService
 * @description
 * # ResponsesService
 * Service in the Public.
 */

angular.module('Public')
    .factory('ResponsesService', function($resource) {
        return $resource('http://localhost:3000/api/response/:id', {},
        {
            'get':    { method: 'GET', isArray:true },
            'query':  { method: 'GET', isArray:true },
            'save':   { method: 'POST' },
            'remove': { method: 'DELETE' },
            'delete': { method: 'DELETE' },
            'update': { method: 'PUT' }
        });
    });
