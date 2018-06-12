(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('comment-pi', {
            parent: 'entity',
            url: '/comment-pi',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Comments'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/comment/commentspi.html',
                    controller: 'CommentPiController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('comment-pi-detail', {
            parent: 'comment-pi',
            url: '/comment-pi/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Comment'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/comment/comment-pi-detail.html',
                    controller: 'CommentPiDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Comment', function($stateParams, Comment) {
                    return Comment.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'comment-pi',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('comment-pi-detail.edit', {
            parent: 'comment-pi-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/comment/comment-pi-dialog.html',
                    controller: 'CommentPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Comment', function(Comment) {
                            return Comment.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('comment-pi.new', {
            parent: 'comment-pi',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/comment/comment-pi-dialog.html',
                    controller: 'CommentPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                content: null,
                                date: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('comment-pi', null, { reload: 'comment-pi' });
                }, function() {
                    $state.go('comment-pi');
                });
            }]
        })
        .state('comment-pi.edit', {
            parent: 'comment-pi',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/comment/comment-pi-dialog.html',
                    controller: 'CommentPiDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Comment', function(Comment) {
                            return Comment.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('comment-pi', null, { reload: 'comment-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('comment-pi.delete', {
            parent: 'comment-pi',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/comment/comment-pi-delete-dialog.html',
                    controller: 'CommentPiDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Comment', function(Comment) {
                            return Comment.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('comment-pi', null, { reload: 'comment-pi' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
