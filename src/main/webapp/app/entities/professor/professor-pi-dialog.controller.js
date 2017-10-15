(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('ProfessorPiDialogController', ProfessorPiDialogController);

    ProfessorPiDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Professor', 'Course'];

    function ProfessorPiDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Professor, Course) {
        var vm = this;

        vm.professor = entity;
        vm.clear = clear;
        vm.save = save;
        vm.courses = Course.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.professor.id !== null) {
                Professor.update(vm.professor, onSaveSuccess, onSaveError);
            } else {
                Professor.save(vm.professor, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('proyectoIntegradorApp:professorUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
