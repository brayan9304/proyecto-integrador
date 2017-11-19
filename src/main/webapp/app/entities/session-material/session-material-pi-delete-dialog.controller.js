(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionMaterialPiDeleteController',SessionMaterialPiDeleteController);

    SessionMaterialPiDeleteController.$inject = ['$uibModalInstance', 'entity', 'SessionMaterial'];

    function SessionMaterialPiDeleteController($uibModalInstance, entity, SessionMaterial) {
        var vm = this;

        vm.sessionMaterial = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            SessionMaterial.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
