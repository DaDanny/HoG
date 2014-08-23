'use strict';

angular.module('hoGApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
