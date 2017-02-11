'use strict';

angular.module('myApp.services.restApiService', [])
    .factory('RestApiService', ['$http', '$window', function($http, $window) {

        var service = {};

        service.request = function(url, cb) {
            if(typeof cb !== 'function') {
                throw new Error('Function expected');
            }

            return $http.get(url).then(function(response) {
                if (response.status === 200) {
                    //if (typeof response.data === 'object') {
                        return cb(response.data);
                    //}
                }
            }, function(response) {
                $window.console.error('Requesting ' + url + ' from server failed (' + response.status + ' ' + response.statusText + ')');
            });
        };

        return service;
    }]);
