(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('material-pi', {
            parent: 'entity',
            url: '/material-pi',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Materials'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/material/materialspi.html',
                    controller: 'MaterialPiController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('material-pi-detail', {
            parent: 'material-pi',
            url: '/material-pi/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Material'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/material/material-pi-detail.html',
                    controller: 'MaterialPiDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Material', function($stateParams, Material) {
                    return Material.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'material-pi',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('material-pi-detail.edit', {
            parent: 'material-pi-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/material/material-pi-dialog.html',
                    controller: 'MaterialPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Material', function(Material) {
                            return Material.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('material-pi.new', {
            parent: 'material-pi',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/material/material-pi-dialog.html',
                    controller: 'MaterialPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                materialFile: null,
                                materialFileContentType: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('material-pi', null, { reload: 'material-pi' });
                }, function() {
                    $state.go('material-pi');
                });
            }]
        })
        .state('material-pi.edit', {
            parent: 'material-pi',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/material/material-pi-dialog.html',
                    controller: 'MaterialPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Material', function(Material) {
                            return Material.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('material-pi', null, { reload: 'material-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('material-pi.delete', {
            parent: 'material-pi',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/material/material-pi-delete-dialog.html',
                    controller: 'MaterialPiDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Material', function(Material) {
                            return Material.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('material-pi', null, { reload: 'material-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
