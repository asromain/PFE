'use strict';

angular.module('Public')
  .factory('socketPublic', function (CONFIG, socketFactory) {
    var backendIOSocket = io(CONFIG.BASE_URL + '/public',
      {
        'reconnection': true,
        'reconnectionAttempts': 10,
        'reconnectionDelay': 1000,
        'reconnectionDelayMax': 5000,
        'timeout': 5000,
        'autoConnect': true,
        'multiplex': false,
        'query': 'token = eyJhbGciOiJIUzI1NiJ9.RGlsbG9u.2dxiEVLiZ1frU_qm05kU0XRnB88QG5nhPFeFNuY2vKc' // TODO eyJhbGciOiJIUzI1NiJ9.RGlsbG9u.2dxiEVLiZ1frU_qm05kU0XRnB88QG5nhPFeFNuY2vKc
      });

    backendIOSocket.on("connect", function () {
      console.log('Connected');
    });

    backendIOSocket.on("error", function (errorData) {
      console.error("An error occurred during connection to Backend.");
      console.log(errorData);
    });

    backendIOSocket.on("disconnect", function () {
      console.info("Disconnected to Backend.");
    });

    backendIOSocket.on("reconnect", function (attemptNumber) {
      console.info("Connected to Backend after " + attemptNumber + " attempts.");
    });

    backendIOSocket.on("reconnect_attempt", function () {
      console.info("Trying to reconnect to Backend.");
    });

    backendIOSocket.on("reconnecting", function (attemptNumber) {
      console.info("Trying to connect to Backend - Attempt number " + attemptNumber + ".");
    });

    backendIOSocket.on("reconnect_error", function (errorData) {
      console.error("An error occurred during reconnection to Backend.");
      console.log(errorData);
    });

    backendIOSocket.on("reconnect_failed", function () {
      console.error("Failed to connect to Backend. New attempt will be done in 5 seconds. Administrators received an Alert !");
      //TODO: Send an email and Notification to Admins !
      /*
       setTimeout(function() {
       backendSocketFactory.backendSocket = null;
       backendSocketFactory.init(token, successCB, failCB);
       }, 5000);
       */
    });

    var socketPublic = socketFactory({
      ioSocket: backendIOSocket
    });

    return socketPublic;
  });
