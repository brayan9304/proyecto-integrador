(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionPiDialogController', SessionPiDialogController);

    SessionPiDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'materialsEntity', 'Session', 'Course', 'CustomCourse', 'Principal'];

    function SessionPiDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, materialsEntity, Session, Course, CustomCourse, Principal) {
        var vm = this;

        vm.account = null;
        vm.session = entity;
        vm.materials = materialsEntity;
        vm.materialsToUpdate = [];
        vm.materialsToDelete = [];
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.courses = [];

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                loadAllCourses(account.id);
            });
        }

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            vm.isSaving = true;
            updateMaterials();
            deleteMaterials();
            if (vm.session.id !== null) {
                Session.update(vm.session, onSaveSuccess, onSaveError);
            } else {
                Session.save(vm.session, onSaveSuccess, onSaveError);
            }
        }


        function updateMaterials() {
            vm.materialsToUpdate.forEach(function (material) {
                if (!materialExists(material)) {
                    vm.session.materials.push(material);
                }
            });
        }

        function deleteMaterials() {

            vm.materialsToDelete.forEach(function (material) {
                var found = false;
                var counter = 0;
                var index = null;
                while (!found) {
                    if (vm.session.materials[counter].id == material.id) {
                        found = true;
                        index = counter;
                    }
                    counter++;
                }
                if (index != null) {
                    vm.session.materials.splice(index, 1);
                }
            });
        }

        function materialExists(material) {
            var exists = false;
            vm.session.materials.forEach(function (m) {
                if (material.id == m.id) {
                    exists = true;
                }
            });
            return exists;
        }

        function onSaveSuccess(result) {
            $scope.$emit('proyectoIntegradorApp:sessionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
            vm.materials = vm.session.materials;
        }

        function onSaveError() {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.date = false;

        function openCalendar(date) {
            vm.datePickerOpenStatus[date] = true;
        }

        function loadAllCourses(id) {
            CustomCourse.query({id: id}, function (result) {
                vm.courses = result;
            });
        }
    }
})();
