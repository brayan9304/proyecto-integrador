(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('sessions-pi', {
            parent: 'entity',
            url: '/sessions-pi/{id}',
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
                sessions: ['$stateParams', 'CustomSessionByCourse', function($stateParams, CustomSessionByCourse) {
                    return CustomSessionByCourse.query({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('session-pi-detail', {
            parent: 'sessions-pi',
            url: '/session-pi/{idSession}',
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
                    return Session.get({id : $stateParams.idSession}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'sessions-pi',
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
                            return Session.get({id : $stateParams.idSession}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('sessions-pi.new', {
            parent: 'sessions-pi',
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
                    $state.go('sessions-pi', null, { reload: 'sessions-pi' });
                }, function() {
                    $state.go('sessions-pi');
                });
            }]
        })
        .state('sessions-pi.edit', {
            parent: 'sessions-pi',
            url: '/edit/{idSession}',
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
                            return Session.get({id : $stateParams.idSession}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('sessions-pi', null, { reload: 'sessions-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('sessions-pi.delete', {
            parent: 'sessions-pi',
            url: '/delete{idSession}',
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
                            return Session.get({id : $stateParams.idSession}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('sessions-pi', null, { reload: 'sessions-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
