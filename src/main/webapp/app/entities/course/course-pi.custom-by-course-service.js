(function() {
    'use strict';
    angular
        .module('proyectoIntegradorApp')
        .factory('CustomSessionByCourse', CustomSessionByCourse);

    CustomSessionByCourse.$inject = ['$resource'];

    function CustomSessionByCourse ($resource) {
        var resourceUrl =  'api/sessions-by-courses/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
