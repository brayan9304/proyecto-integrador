(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('CoursePiDialogController', CoursePiDialogController);

    CoursePiDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Course', 'Session', 'Principal', 'CustomProfessor'];

    function CoursePiDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, Course, Session, Principal, CustomProfessor) {
        var vm = this;
        debugger;
        vm.course = entity;
        vm.clear = clear;
        vm.save = save;
        vm.sessions = Session.query();
        vm.professor = null;
        vm.account = null;

        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                loadProfessor(account.id);
            });
        }

        function loadProfessor(id) {
            CustomProfessor.get({id: id}, function (result) {
                vm.professor = result;
                vm.course.professorId = vm.professor.id;
            });
        }

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            vm.isSaving = true;
            if (vm.course.id !== null) {
                Course.update(vm.course, onSaveSuccess, onSaveError);
            } else {
                Course.save(vm.course, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {
            $scope.$emit('proyectoIntegradorApp:courseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError() {
            vm.isSaving = false;
        }


    }
})();
