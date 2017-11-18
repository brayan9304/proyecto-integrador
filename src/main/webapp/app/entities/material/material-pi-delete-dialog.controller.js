(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('MaterialPiDeleteController',MaterialPiDeleteController);

    MaterialPiDeleteController.$inject = ['$uibModalInstance', 'entity', 'Material'];

    function MaterialPiDeleteController($uibModalInstance, entity, Material) {
        var vm = this;

        vm.material = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Material.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
