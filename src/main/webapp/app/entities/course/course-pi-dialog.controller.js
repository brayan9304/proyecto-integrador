(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('CoursePiDialogController', CoursePiDialogController);

    CoursePiDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Course', 'Session', 'Professor'];

    function CoursePiDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Course, Session, Professor) {
        var vm = this;

        vm.course = entity;
        vm.clear = clear;
        vm.save = save;
        vm.sessions = Session.query();
        vm.professors = Professor.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.course.id !== null) {
                Course.update(vm.course, onSaveSuccess, onSaveError);
            } else {
                Course.save(vm.course, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('proyectoIntegradorApp:courseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
