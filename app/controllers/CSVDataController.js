'use strict';

angular.module('myApp.controllers.CSVDataController', ['myApp.services.CSVDataService','myApp.services.interControllerCommunication'])
    .controller('CSVDataController', [ 'CSVDataService', 'InterControllerCommunication','$scope',function(csvDataService, icc, $scope) {
       $scope.callService =function(url,columnSelectors) {
           console.log(url);
         csvDataService.request(url,columnSelectors);
       } ;
        var handler = function (e, data) {
            $scope.data = data;
        }
        var list = icc.subscribe('list.update', handler);
        console.log(list);

    }]);
