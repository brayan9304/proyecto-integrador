(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionMaterialPiDialogController', SessionMaterialPiDialogController);

    SessionMaterialPiDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Material', 'Session'];

    function SessionMaterialPiDialogController($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Material, Session) {
        var vm = this;

        vm.session = entity;
        vm.material = null;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            vm.isSaving = true;
            if (vm.material.id !== null) {
                Material.update(vm.material, onSaveSuccess, onSaveError);
            } else {
                Material.save(vm.material, onSaveSuccess, onSaveError);
            }
        }

        function UpdateSession(result) {
            vm.session.materials.push(result);
            Session.update(vm.session);
        }


        function onSaveSuccess(result) {
            $scope.$emit('proyectoIntegradorApp:materialUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
            UpdateSession(result);
        }

        function onSaveError() {
            vm.isSaving = false;
        }


        vm.setMaterialFile = function ($file, material) {
            if ($file) {
                DataUtils.toBase64($file, function (base64Data) {
                    $scope.$apply(function () {
                        material.materialFile = base64Data;
                        material.materialFileContentType = $file.type;
                    });
                });
            }
        };

    }
})();
