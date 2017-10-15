(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('course-pi', {
            parent: 'entity',
            url: '/course-pi',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Courses'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/course/coursespi.html',
                    controller: 'CoursePiController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('course-pi-detail', {
            parent: 'course-pi',
            url: '/course-pi/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Course'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/course/course-pi-detail.html',
                    controller: 'CoursePiDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Course', function($stateParams, Course) {
                    return Course.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'course-pi',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('course-pi-detail.edit', {
            parent: 'course-pi-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/course/course-pi-dialog.html',
                    controller: 'CoursePiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Course', function(Course) {
                            return Course.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('course-pi.new', {
            parent: 'course-pi',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/course/course-pi-dialog.html',
                    controller: 'CoursePiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                subject: null,
                                description: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('course-pi', null, { reload: 'course-pi' });
                }, function() {
                    $state.go('course-pi');
                });
            }]
        })
        .state('course-pi.edit', {
            parent: 'course-pi',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/course/course-pi-dialog.html',
                    controller: 'CoursePiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Course', function(Course) {
                            return Course.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('course-pi', null, { reload: 'course-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('course-pi.delete', {
            parent: 'course-pi',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/course/course-pi-delete-dialog.html',
                    controller: 'CoursePiDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Course', function(Course) {
                            return Course.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('course-pi', null, { reload: 'course-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
