(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('CommentPiDetailController', CommentPiDetailController);

    CommentPiDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Comment', 'Professor', 'Post'];

    function CommentPiDetailController($scope, $rootScope, $stateParams, previousState, entity, Comment, Professor, Post) {
        var vm = this;

        vm.comment = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('proyectoIntegradorApp:commentUpdate', function(event, result) {
            vm.comment = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
