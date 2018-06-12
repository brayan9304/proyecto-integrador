(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('PostPiDeleteController',PostPiDeleteController);

    PostPiDeleteController.$inject = ['$uibModalInstance', 'entity', 'Post'];

    function PostPiDeleteController($uibModalInstance, entity, Post) {
        var vm = this;

        vm.post = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Post.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
