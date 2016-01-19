'use strict';

/**
 * @ngdoc service
 * @name chairmanApp.notification
 * @description
 * # notification
 * Factory in the chairmanApp.
 */
angular.module('chairmanApp')
  .factory('notification', function ($notification, CONFIG) {

    return {
      writeNotification: function (json) {
        console.log(json);
        if(json.status !== undefined) {
          var title = json.title ? json.title : "";
          var message = json.message ? json.message : "";

          switch (json.status) {
            case CONFIG.JSON_STATUS_SUCCESS: $notification.success(title, message); break;
            case CONFIG.JSON_STATUS_WARNING: $notification.warning(title, message); break;
            case CONFIG.JSON_STATUS_NOTICE: $notification.info(title, message); break;
            case CONFIG.JSON_STATUS_ERROR: $notification.error(title, message); break;
          }

        } else {
          $notification.error('Erreur', 'Erreur requete ajax');
        }

        return;
      }
    };
  });
