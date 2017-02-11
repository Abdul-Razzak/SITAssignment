'use strict';

angular.module('myApp.services.CSVDataService', ['papa-promise','myApp.services.restApiService','myApp.services.interControllerCommunication'])
    .factory('CSVDataService', ['Papa', 'RestApiService', 'InterControllerCommunication', function(Papa, restApiService, icc) {

        var service={};
        var columnSelectors;
        service.request = function (url, columnSelectorsParams) {
            columnSelectors = [];
            var array = columnSelectorsParams.toLowerCase().split(',');
            for(var i in array) {
                columnSelectors.push(array[i].charCodeAt(0) - 97);
            }
            //return restApiService.request("/utils/tmp-out.csv",updateHandler);
            return restApiService.request(url,updateHandler);


        }
        function handleParseResult(result) {
            var returnList = [];
            var csvData = result.data;
            var columnHeaders = extractFirstRow(csvData);
            var cellContent;
            var columnSet;
            console.log(columnHeaders);
            for(var rowIndex in csvData) {
                if(rowIndex == 0) {
                    continue;
                } else {
                    columnSet = csvData[rowIndex];
                    var json = {
                        IP : columnSet[0],
                        country : columnSet[1],
                        ISP : columnSet[2],
                        columns: []
                }
                    for(var index in columnSelectors) {
                        cellContent = columnSet[columnSelectors[index]];
                        if(cellContent!= null && cellContent.charAt(0) !== '0') {
                           json.columns.push(columnHeaders[columnSelectors[index]]);
                        }
                    }
                     returnList.push(json);
                }
            }
            icc.publish('list.update', returnList);
        }

        var extractFirstRow = function(csvData) {
            return csvData[0];
        }

        function handleParseError(result) {
            // display error message to the user
        }

        function parsingFinished() {
        }
        
        var updateHandler = function(data) {
             Papa.parse(data)
                .then(handleParseResult)
                .catch(handleParseError)
                .finally(parsingFinished);
        }

        return service;

    }]);