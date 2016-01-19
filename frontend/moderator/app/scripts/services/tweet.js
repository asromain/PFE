'use strict';

/**
 * @ngdoc service
 * @name Moderator.tweet
 * @description
 * # tweet
 * Factory in the Moderator.
 */
angular.module('Moderator')
  .factory('tweet', function ($http, notification, $rootScope, $q) {
    // Service logic
    // ...

   return {
      removeTweet: function (tweetToSend) {

        console.log("tweet removed " + tweetToSend);
         var deferred = $q.defer();
        $http.delete('http://localhost:3000/api/tweet/sendToPublic', tweetToSend)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },

      validateTweet: function (tweetToSend) {
         var deferred = $q.defer();
        $http.put('http://localhost:3000/api/tweet/sendToScreen', tweetToSend)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      }
    }
  });

