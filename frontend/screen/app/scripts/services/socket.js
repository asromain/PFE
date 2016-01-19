'use strict';

angular.module('screen')
.factory('backendSocket', function (socketFactory) {
		var backendIOSocket = io('http://localhost:3000/screen',
			{
				'reconnection': true,
				'reconnectionAttempts': 10,
				'reconnectionDelay': 1000,
				'reconnectionDelayMax': 5000,
				'timeout': 5000,
				'autoConnect': true,
				'multiplex': false
			});

		backendIOSocket.on("connect", function () {
			console.log('connect');
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



		var backendSocket = socketFactory({
			ioSocket: backendIOSocket
		});

		return backendSocket;
	});
