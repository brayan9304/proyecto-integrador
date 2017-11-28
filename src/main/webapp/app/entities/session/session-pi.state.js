(function () {
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
                    sessions: ['$stateParams', 'CustomSessionByCourse', function ($stateParams, CustomSessionByCourse) {
                        return CustomSessionByCourse.query({id: $stateParams.id}).$promise;
                    }],
                    courseId: ['$stateParams', function ($stateParams) {
                        return $stateParams.id;
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
                    entityId: ['$stateParams', function ($stateParams) {
                        return $stateParams.idSession;
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
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/session/session-pi-dialog.html',
                        controller: 'SessionPiDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: ['Session', function (Session) {
                                return Session.get({id: $stateParams.idSession}).$promise;
                            }],
                            materialsEntity: ['Material', function (Material) {
                                return Material.query().$promise;
                            }]
                        }
                    }).result.then(function () {
                        $state.go('^', {}, {reload: false});
                    }, function () {
                        $state.go('^');
                    });
                }]
            })
            .state('sessions-pi.new', {
                parent: 'sessions-pi',
                url: '/new/{idCourse}',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
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
                            },
                            materialsEntity: ['Material', function (Material) {
                                return Material.query().$promise;
                            }],
                            courseEntity: ['Course', function (Course) {
                                return Course.get({id: $stateParams.idCourse}).$promise;
                            }]
                        }
                    }).result.then(function () {
                        $state.go('sessions-pi', null, {reload: 'sessions-pi'});
                    }, function () {
                        $state.go('sessions-pi');
                    });
                }]
            })
            .state('sessions-pi.edit', {
                parent: 'sessions-pi',
                url: '/edit/{idCourse}/{idSession}',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/session/session-pi-dialog.html',
                        controller: 'SessionPiDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: ['Session', function (Session) {
                                return Session.get({id: $stateParams.idSession}).$promise;
                            }],
                            materialsEntity: ['Material', function (Material) {
                                return Material.query().$promise;
                            }],
                            courseEntity: ['Course', function (Course) {
                                return Course.get({id: $stateParams.idCourse}).$promise;
                            }]
                        }
                    }).result.then(function () {
                        $state.go('sessions-pi', null, {reload: 'sessions-pi'});
                    }, function () {
                        $state.go('^');
                    });
                }]
            })
            .state('reuse-material-pi', {
                parent: 'session-pi-detail',
                url: '/reuse-material/{idSession}',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/session/reuse-material-pi-dialog.html',
                        controller: 'ReuseMaterialPiDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: ['Session', function (Session) {
                                return Session.get({id: $stateParams.idSession}).$promise;
                            }],
                            materialsEntity: ['Material', function (Material) {
                                return Material.query().$promise;
                            }]
                        }
                    }).result.then(function () {
                        $state.go('^', {}, {reload: true});
                    }, function () {
                        $state.go('^');
                    });
                }]
            })
            .state('sessions-pi.addMaterial', {
                parent: 'session-pi-detail',
                url: '/add-material/{idSession}',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$window', '$stateParams', '$state', '$uibModal', function ($window, $stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/session/session-material-pi-dialog.html',
                        controller: 'SessionMaterialPiDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: ['Session', function (Session) {
                                return Session.get({id: $stateParams.idSession}).$promise;
                            }]
                        }
                    }).result.then(function () {
                        $state.go('^', {}, {reload: true});
                    }, function () {
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
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/session/session-pi-delete-dialog.html',
                        controller: 'SessionPiDeleteController',
                        controllerAs: 'vm',
                        size: 'md',
                        resolve: {
                            entity: ['Session', function (Session) {
                                return Session.get({id: $stateParams.idSession}).$promise;
                            }]
                        }
                    }).result.then(function () {
                        $state.go('sessions-pi', null, {reload: 'sessions-pi'});
                    }, function () {
                        $state.go('^');
                    });
                }]
            });
    }

})();
