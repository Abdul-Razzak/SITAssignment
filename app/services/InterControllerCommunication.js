'use strict';

angular
    .module('myApp.services.interControllerCommunication', [])
    .factory('InterControllerCommunication', ['$rootScope', '$window', function($rootScope, $window) {
        return {
            publish: function(topic, data) {
                $rootScope.$emit(topic, data);
            },
            subscribe: function(topic, func, scope) {
                var unbinder = $rootScope.$on(topic, func);

                if (scope) {
                    scope.$on('$destroy', unbinder);
                }
            },
            unsubscribe: function(topic, func) {
                if(typeof $rootScope.$$listeners[topic] === 'undefined') {
                    $window.console.warn('[InterControllerCommunication] trying to unsubscribe from non-existent topic');
                    return;
                }

                for(var i in $rootScope.$$listeners[topic]) {
                    if($rootScope.$$listeners[topic][i] === func) {
                        $rootScope.$$listeners[topic][i] = null;
                    }
                }
            }
        };
    }]);