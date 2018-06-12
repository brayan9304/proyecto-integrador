(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('post-pi', {
            parent: 'entity',
            url: '/post-pi',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Posts'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/post/postspi.html',
                    controller: 'PostPiController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('post-pi-detail', {
            parent: 'post-pi',
            url: '/post-pi/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Post'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/post/post-pi-detail.html',
                    controller: 'PostPiDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Post', function($stateParams, Post) {
                    return Post.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'post-pi',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('post-pi-detail.edit', {
            parent: 'post-pi-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/post/post-pi-dialog.html',
                    controller: 'PostPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Post', function(Post) {
                            return Post.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('post-pi.new', {
            parent: 'post-pi',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/post/post-pi-dialog.html',
                    controller: 'PostPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                content: null,
                                materialFile: null,
                                materialFileContentType: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('post-pi', null, { reload: 'post-pi' });
                }, function() {
                    $state.go('post-pi');
                });
            }]
        })
        .state('post-pi.edit', {
            parent: 'post-pi',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/post/post-pi-dialog.html',
                    controller: 'PostPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Post', function(Post) {
                            return Post.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('post-pi', null, { reload: 'post-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('post-pi.delete', {
            parent: 'post-pi',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/post/post-pi-delete-dialog.html',
                    controller: 'PostPiDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Post', function(Post) {
                            return Post.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('post-pi', null, { reload: 'post-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
