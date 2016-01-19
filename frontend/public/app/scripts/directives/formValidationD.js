'use strict';

/**
 * Created by Romain on 13/01/2016.
 */

angular.module('Public')
  .directive('maxCharacter', function() {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var maxlength = Number(attrs.maxCharacter);
        function textSaisieParUser(text) {
          if (text.length > maxlength) {
            var transformedInput = text.substring(0, maxlength);
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
            return transformedInput;
          }
          return text;
        }
        ngModelCtrl.$parsers.push(textSaisieParUser);
      }
    };
  });
