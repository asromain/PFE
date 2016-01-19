'use strict';

/**
 * @ngdoc service
 * @name Moderator.question
 * @description
 * # question
 * Factory in the Moderator.
 */
angular.module('Moderator')
  .factory('question', function ($http, notification, $rootScope, $q) {
    // Service logic
    // ...

    return {
      removeQuestion: function (questionToRemove , idQuestion) {

        console.log(questionToRemove + "id " + idQuestion);
         var deferred = $q.defer();
        $http.delete('http://localhost:3000/api/question/sendToPublic/'+idQuestion, questionToRemove)
          .success(function(data) {
            notification.writeNotification(data);
            deferred.resolve(data);
          }).error(function(data) {
            notification.writeNotification(data);
            deferred.reject(false);
          });
        return deferred.promise;
      },

     validateQuestion: function (questionToSend, idQuestion) {

      console.log("question validate" + questionToSend);
       var deferred = $q.defer();
      $http.put('http://localhost:3000/api/question/sendToChairman/'+idQuestion, questionToSend)
        .success(function(data) {
         notification.writeNotification(data);
          deferred.resolve(data);
        }).error(function(data) {
        notification.writeNotification(data);
          deferred.reject(false);
        });
      return deferred.promise;
    }
    };
  });
