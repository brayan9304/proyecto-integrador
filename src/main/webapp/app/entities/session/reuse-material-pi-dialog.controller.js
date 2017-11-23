(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('ReuseMaterialPiDialogController', ReuseMaterialPiDialogController);

    ReuseMaterialPiDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'materialsEntity', 'Session', 'Principal'];

    function ReuseMaterialPiDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, materialsEntity, Session, Principal) {
        var vm = this;

        vm.account = null;
        vm.session = entity;
        vm.materials = materialsEntity;
        vm.materialsToUpdate = [];
        vm.clear = clear;
        vm.save = save;

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
            });
        }

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            vm.isSaving = true;
            updateMaterials();
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
    }
})();
