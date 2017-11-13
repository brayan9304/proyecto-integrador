(function() {
    'use strict';
    angular
        .module('proyectoIntegradorApp')
        .factory('CustomSession', CustomSession);

    CustomSession.$inject = ['$resource', 'DateUtils'];

    function CustomSession ($resource, DateUtils) {
        var resourceUrl =  'api/custom-sessions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertDateTimeFromServer(data.date);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
