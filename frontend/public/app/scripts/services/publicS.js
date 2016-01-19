'use strict';

/**
 * @ngdoc service
 * @name Public.PublicService
 * @description
 * # PublicService
 * Service in the Public.
 */

angular.module('Public')
    .factory('UsersService', function($resource) {
        return $resource('http://localhost:3000/api/public/:id', {},
        {
            'get':    { method: 'GET', isArray:true },
            'query':  { method: 'GET', isArray:true },
            'save':   { method: 'POST' },
            'remove': { method: 'DELETE' },
            'delete': { method: 'DELETE' },
            'update': { method: 'PUT' }
        });
    });