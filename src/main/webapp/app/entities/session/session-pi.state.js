(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('session-pi', {
            parent: 'entity',
            url: '/session-pi',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Sessions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/session/sessionspi.html',
                    controller: 'SessionPiController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('session-pi-detail', {
            parent: 'session-pi',
            url: '/session-pi/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Session'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/session/session-pi-detail.html',
                    controller: 'SessionPiDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Session', function($stateParams, Session) {
                    return Session.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'session-pi',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('session-pi-detail.edit', {
            parent: 'session-pi-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session/session-pi-dialog.html',
                    controller: 'SessionPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Session', function(Session) {
                            return Session.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('session-pi.new', {
            parent: 'session-pi',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session/session-pi-dialog.html',
                    controller: 'SessionPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                description: null,
                                semester: null,
                                date: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('session-pi', null, { reload: 'session-pi' });
                }, function() {
                    $state.go('session-pi');
                });
            }]
        })
        .state('session-pi.edit', {
            parent: 'session-pi',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session/session-pi-dialog.html',
                    controller: 'SessionPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Session', function(Session) {
                            return Session.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('session-pi', null, { reload: 'session-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('session-pi.delete', {
            parent: 'session-pi',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session/session-pi-delete-dialog.html',
                    controller: 'SessionPiDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Session', function(Session) {
                            return Session.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('session-pi', null, { reload: 'session-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
