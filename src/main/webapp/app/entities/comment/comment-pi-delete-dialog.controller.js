(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('CommentPiDeleteController',CommentPiDeleteController);

    CommentPiDeleteController.$inject = ['$uibModalInstance', 'entity', 'Comment'];

    function CommentPiDeleteController($uibModalInstance, entity, Comment) {
        var vm = this;

        vm.comment = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Comment.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
