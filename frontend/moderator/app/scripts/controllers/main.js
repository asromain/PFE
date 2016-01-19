'use strict';
//var backendIOSocket = "";
/**
 * @ngdoc function
 * @name Moderator:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Moderator
 */
var app = angular.module('Moderator');


app.run(function (editableOptions) {
    editableOptions.theme = 'bs1';
});

app.controller('MainCtrl', function ($scope , $http , socketModerator, notification, tweet, question) {
  $scope.events = [];
  $scope.tweets = [];

  $scope.logged = false;
  $scope.login = {
    pseudo : "",
    password : ""
  }

  $scope.signup = {
    pseudo : "",
    password : ""
  }


  $scope.created = false;


   $scope.public_name = "";
  $scope.checkLogin = function(){
    console.log('try ');
    if($scope.login.pseudo === "moderator" && $scope.login.password === "a"){
      $scope.logged = true;
      var log = {
        title : "login",
        message : "login accepted",
        status : 110
      }
      notification.writeNotification(log);
    }
    else{
      var log = {
        title : "login",
        message : "login refused",
        status : 111
      }
      notification.writeNotification(log);
    }
  }
/*
  $http.get('data.json').success(function(data){
    $scope.tweets=data;


  });
*/
  // retrieve data from data base
  $http.get("http://localhost:3000/api/question")
    .then(function(response) {
      for(var i=0;i<response.data.length;i++) {
        
        /*if(response.data[i].status_code == 1){
          $scope.events[i] = response.data[i];
        }*/
         $scope.events[i] = response.data[i];
        
      }
    });

    socketModerator.init();

  // add a new question from public
  $scope.addEvent = function(){
    $scope.events.push($scope.event);
    $scope.event = '';

  };
  // add a new tweet
  $scope.addTweet = function(){
    $scope.tweets.push($scope.tweet);
    $scope.tweet = '';

  };

   $scope.$watch('events.event',function(){

         console.log("okok");

    });

  // listened for a new tweet
  socketModerator.on("tweetToSc" , function(msg){
    console.log("tweet validated : ");
     var json = {
        title : "twwet",
        message : "new tweet",
        status : 101
      }
      notification.writeNotification(json);
  });

  //listened for a new question
  socketModerator.on("question" , function(msg){
    console.log("question validated: "  + msg);

  });

  //listened for a new question
  socketModerator.on("tweet" , function(msg){

   
       // mise a jour de la view
        $scope.tweets.push(msg);
       $scope.$apply();
   
  });

  socketModerator.on("questionFromPublic" , function(msg){

    $http.get("http://localhost:3000/api/public/"+msg.public_id)
      .then(function(response) {
         $scope.public_name = response.data[0].nom;
       // console.log("new question question: " +msg.public_id + " ; name :"  + response.data[0].nom);
    });

    $scope.events.push(msg);
    var json = {
        title : "question",
        message : "new question",
        status : 100
      }
      notification.writeNotification(json);

  });


  // remove question and send a message to public
  $scope.removeEvent = function(index){

    $scope.events[index].status_code = -1;
    question.removeQuestion($scope.events[index] , $scope.events[index].id);
    $scope.events.splice(index,1);

  };


  // remove tweet
   $scope.removeTweet = function(index){
      $scope.tweets.splice(index,1);

   //  tweet.removeTweet($scope.tweets[index]);
  };


  // update a question before sending to chairman
  $scope.editEvent = function(event, index){
    $scope.events[index] =  event;
  };

  // send question if valitdated to chairman and store it in Data Base
  $scope.sendToBD = function(index){

    $scope.events[index].status_code = 2;
    question.validateQuestion($scope.events[index] , $scope.events[index].id);
    $scope.events.splice(index,1);
    

  };

  //send question if valitdate to screen (tweet wall)
  $scope.sendToScreen = function(index){
    tweet.validateTweet($scope.tweets[index]);
    $scope.removeTweet(index);
  };


  /**
  create a new compte
  */
  $scope.inscription = function(){
    $scope.created = true;
  }





});
