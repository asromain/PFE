'use strict';

/**
 * @ngdoc function
 * @name Public.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the Public
 */

  // TODO notification
  //$notification.info("TEST", "TEST....");
  //TODO question anonyme
  // TODO mise a jour coté public d'une modif du moderateur

angular.module('Public')
  .controller('QuestionsCtrl', function ($scope, $http, CONFIG, socketPublic,
                                         QuestionsService, UsersService, ResponsesService
                                         /*,$notification*/) {


    // contient question et response de la forme : {"question":{}, "response":{"content":"..."}}
    $scope.Map = {};
    $scope.show = false;

    /** ====================
     *       RESOURCES
     *  ==================== */
    var questionsList = QuestionsService.get(function () {
      $scope.questionList = questionsList;
    });

    var responsesList = ResponsesService.get(function () {
      $scope.responsesList = responsesList;
    });

    var usersList = UsersService.get(function () {
      $scope.usersList = usersList;
    });

    /** ====================
     *     USING PROMISES
     *  ==================== */
    // stockage dans la Map des questions presentes dans la BD
    questionsList.$promise.then(function(data) {
      for(var i = 0; i < data.length; i++) {
        var objTmp = {};
        objTmp.question = data[i];
        objTmp.response = {};
        $scope.Map[data[i].id] = objTmp;
      }
    });

    // stockage dans la Map des reponses presentes dans la BD
    responsesList.$promise.then(function(data) {
      for(var i = 0; i < data.length; i++) {
        var key = data[i].question_id;
        if ($scope.Map.hasOwnProperty(key)) {
          $scope.Map[key].response = {"content" : data[i].content};
        }
      }
    });

    /** ==================
     *     THE SOCKETS
     *  ================== */

    // reception des reponse à des questions
    socketPublic.on('question', function (r) {
      console.log("NOUVELLE REPONSE DU CHAIRMAN");
      //console.log(JSON.stringify(questionAndResponse));
      //console.log('ID question : ' + questionAndResponse.question.id + '\nReponse : ' + questionAndResponse.response);
      $scope.Map[r.question.id].response = {"content" : r.response};
    });

    // reception des reponse à des questions d'autres utilisateurs
    // TODO remplacer pour recevoir les questions quand elles ont été validées par le moderateur ou chairman
    socketPublic.on('questionFromPublicToPublic', function (question) {
      console.log("NOUVELLE QUESTION DU PUBLIC");
      console.log(question);
      var objTmp = {};
      objTmp.question = question;
      objTmp.response = {};
      $scope.Map[question.id] = objTmp;
    });
  });
