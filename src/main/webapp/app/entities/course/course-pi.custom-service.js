(function() {
    'use strict';
    angular
        .module('proyectoIntegradorApp')
        .factory('CustomCourse', CustomCourse);

    CustomCourse.$inject = ['$resource'];

    function CustomCourse ($resource) {
        var resourceUrl =  'api/custom-courses/:id';

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
