(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('ProfessorPiDeleteController',ProfessorPiDeleteController);

    ProfessorPiDeleteController.$inject = ['$uibModalInstance', 'entity', 'Professor'];

    function ProfessorPiDeleteController($uibModalInstance, entity, Professor) {
        var vm = this;

        vm.professor = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Professor.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
