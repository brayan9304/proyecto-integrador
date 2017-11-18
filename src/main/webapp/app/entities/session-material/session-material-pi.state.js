(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('session-material-pi', {
            parent: 'entity',
            url: '/session-material-pi',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'SessionMaterials'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/session-material/session-materialspi.html',
                    controller: 'SessionMaterialPiController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('session-material-pi-detail', {
            parent: 'session-material-pi',
            url: '/session-material-pi/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'SessionMaterial'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/session-material/session-material-pi-detail.html',
                    controller: 'SessionMaterialPiDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'SessionMaterial', function($stateParams, SessionMaterial) {
                    return SessionMaterial.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'session-material-pi',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('session-material-pi-detail.edit', {
            parent: 'session-material-pi-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session-material/session-material-pi-dialog.html',
                    controller: 'SessionMaterialPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SessionMaterial', function(SessionMaterial) {
                            return SessionMaterial.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('session-material-pi.new', {
            parent: 'session-material-pi',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session-material/session-material-pi-dialog.html',
                    controller: 'SessionMaterialPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                idSession: null,
                                idMaterial: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('session-material-pi', null, { reload: 'session-material-pi' });
                }, function() {
                    $state.go('session-material-pi');
                });
            }]
        })
        .state('session-material-pi.edit', {
            parent: 'session-material-pi',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session-material/session-material-pi-dialog.html',
                    controller: 'SessionMaterialPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SessionMaterial', function(SessionMaterial) {
                            return SessionMaterial.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('session-material-pi', null, { reload: 'session-material-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('session-material-pi.delete', {
            parent: 'session-material-pi',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session-material/session-material-pi-delete-dialog.html',
                    controller: 'SessionMaterialPiDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['SessionMaterial', function(SessionMaterial) {
                            return SessionMaterial.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('session-material-pi', null, { reload: 'session-material-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
