(function() {
    'use strict';
    angular
        .module('proyectoIntegradorApp')
        .factory('AdvancedSearch', AdvancedSearch);

    AdvancedSearch.$inject = ['$resource'];

    function AdvancedSearch ($resource) {
        var resourceUrl =  'api/advanced-search/:data';

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
