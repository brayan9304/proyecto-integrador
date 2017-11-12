(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('UserManagementDialogController', UserManagementDialogController);

    UserManagementDialogController.$inject = ['$stateParams', '$uibModalInstance', 'entity', 'User', 'Professor'];

    function UserManagementDialogController($stateParams, $uibModalInstance, entity, User, Professor) {
        var vm = this;

        vm.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        vm.clear = clear;
        vm.languages = null;
        vm.save = save;
        vm.user = entity;


        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function onSaveSuccess(result) {
            vm.isSaving = false;
            var professors = [];
            Professor.query(function (result) {
                professors = result;
                var professor = {
                    userName: null,
                    email: null,
                    relatedUserId: null
                };
                var professorAux = null;
                var exists = false;
                professors.every(function (item) {
                    if (item.relatedUserId == vm.user.id) {
                        exists = true;
                        professorAux = item;
                        professorAux.email = vm.user.email;
                        professorAux.userName = vm.user.login;
                        return false;
                    }
                });
                if (exists != true) {
                    professor.userName = vm.user.login;
                    professor.email = vm.user.email;
                    professor.relatedUserId = vm.user.id;
                    Professor.save(professor);
                }
                else {
                    Professor.update(professorAux);
                }
            });
            $uibModalInstance.close(result);
        }

        function onSaveError() {
            vm.isSaving = false;
        }

        function save() {
            vm.isSaving = true;
            if (vm.user.id !== null) {
                User.update(vm.user, onSaveSuccess, onSaveError);
            } else {
                vm.user.langKey = 'en';
                User.save(vm.user, onSaveSuccess, onSaveError);
            }
        }

    }
})();
