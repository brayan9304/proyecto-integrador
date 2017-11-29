(function () {
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
        })
            .state('add-material-popup', {
                parent: 'advanced-search',
                url: '/add/{idProfessor}/{idMaterial}',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/advancedSearch/advanced-search-popup.html',
                        controller: 'AdvancedSearchPopUpController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            sessionEntities: ['CustomSession', function (CustomSession) {
                                return CustomSession.query({id: $stateParams.idProfessor}).$promise;
                            }],
                            idMaterial: [function () {
                                return $stateParams.idMaterial;
                            }]
                        }
                    }).result.then(function () {
                        $state.go('^', {}, {reload: false});
                    }, function () {
                        $state.go('^');
                    });
                }]
            });
    }
})();
