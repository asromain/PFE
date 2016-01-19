'use strict';

/**
 * Created by Romain on 09/12/2015.
 */

angular.module('Public')
  .controller('SendquestionCtrl', function ($scope, $http, CONFIG, $location) {

    //var questions = QuestionService.query(function() {
    //    $scope.questions = questions;
    //});
    //
    //// au final pas besoin de ca, car users est un tableau de user
    //// simplement faire users[2] par exemple
    //var question = QuestionService.get({ id: $scope.id }, function() {
    //    $scope.question = question;
    //});

    $scope.questionResponseArray = [];

    /** ============
     *  LES SOCKETS
     *  ============ */

    /**
     *  envoi de question
     */
    $scope.sendQuestionToMod = function () {

      console.log($scope.textcontent);
      console.log($scope.numslide);

      // status_code, question_id par defaut
      var question = {
        "content": $scope.textcontent,
        "public_id": 1,
        "num_slide": $scope.numslide,
        "up_vote": 0,
        "created_at": new Date()/1000
      };

      $http.post(CONFIG.BASE_URL_API + '/question/sendToModerator', question) // TODO config    .... ,  $scope.question
        .success(function (data) {
          console.log('succes');
          console.log(data);
          $location.path('/');      // TODO afficher une notification

        }).error(function (data) {
        console.log('fail');
        console.log(data);
      });
    };
  });
