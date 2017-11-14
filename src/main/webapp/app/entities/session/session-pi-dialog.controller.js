(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionPiDialogController', SessionPiDialogController);

    SessionPiDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Session', 'Course', 'CustomCourse', 'Principal'];

    function SessionPiDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Session, Course, CustomCourse, Principal) {
        var vm = this;

        vm.account = null;
        vm.session = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.courses = [];

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                loadAllCourses(account.id);
            });
        }

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.session.id !== null) {
                Session.update(vm.session, onSaveSuccess, onSaveError);
            } else {
                Session.save(vm.session, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('proyectoIntegradorApp:sessionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.date = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }

        function loadAllCourses(id) {
            CustomCourse.query({id: id}, function (result) {
                vm.courses = result;
            });
        }
    }
})();
