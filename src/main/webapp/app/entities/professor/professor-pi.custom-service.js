(function() {
    'use strict';
    angular
        .module('proyectoIntegradorApp')
        .factory('CustomProfessor', CustomProfessor);

    CustomProfessor.$inject = ['$resource'];

    function CustomProfessor ($resource) {
        var resourceUrl =  'api/custom-professors/:id';

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
