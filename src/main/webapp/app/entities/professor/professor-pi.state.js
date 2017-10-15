(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('professor-pi', {
            parent: 'entity',
            url: '/professor-pi',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Professors'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/professor/professorspi.html',
                    controller: 'ProfessorPiController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('professor-pi-detail', {
            parent: 'professor-pi',
            url: '/professor-pi/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Professor'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/professor/professor-pi-detail.html',
                    controller: 'ProfessorPiDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Professor', function($stateParams, Professor) {
                    return Professor.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'professor-pi',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('professor-pi-detail.edit', {
            parent: 'professor-pi-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/professor/professor-pi-dialog.html',
                    controller: 'ProfessorPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Professor', function(Professor) {
                            return Professor.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('professor-pi.new', {
            parent: 'professor-pi',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/professor/professor-pi-dialog.html',
                    controller: 'ProfessorPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                lastname: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('professor-pi', null, { reload: 'professor-pi' });
                }, function() {
                    $state.go('professor-pi');
                });
            }]
        })
        .state('professor-pi.edit', {
            parent: 'professor-pi',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/professor/professor-pi-dialog.html',
                    controller: 'ProfessorPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Professor', function(Professor) {
                            return Professor.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('professor-pi', null, { reload: 'professor-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('professor-pi.delete', {
            parent: 'professor-pi',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/professor/professor-pi-delete-dialog.html',
                    controller: 'ProfessorPiDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Professor', function(Professor) {
                            return Professor.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('professor-pi', null, { reload: 'professor-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
