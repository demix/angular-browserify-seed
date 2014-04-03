var interceptors = angular.module('interceptors' , []);

interceptors.factory('httpInterceptor', ['$q', function($q){
    return {
        request: function(config){
            if( config.url.indexOf('tm=') == -1 ){
                config.url = config.url + ( config.url.indexOf('?') == -1 ? '?tm=' : '&tm=') + (+new Date());
            }

            return config || $q.when(config);
        }
    };
}]);
