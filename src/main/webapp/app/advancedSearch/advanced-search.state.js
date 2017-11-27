(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('advanced-search', {
            parent: 'app',
            url: '/advanced-search',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/advancedSearch/advanced-search.html',
                    controller: 'AdvancedSearchController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
