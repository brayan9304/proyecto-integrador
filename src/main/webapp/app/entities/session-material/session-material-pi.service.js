(function() {
    'use strict';
    angular
        .module('proyectoIntegradorApp')
        .factory('SessionMaterial', SessionMaterial);

    SessionMaterial.$inject = ['$resource'];

    function SessionMaterial ($resource) {
        var resourceUrl =  'api/session-materials/:id';

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
