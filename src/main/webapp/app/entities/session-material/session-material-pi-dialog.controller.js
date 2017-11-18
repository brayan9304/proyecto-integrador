(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionMaterialPiDialogController', SessionMaterialPiDialogController);

    SessionMaterialPiDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'SessionMaterial', 'Session', 'Material'];

    function SessionMaterialPiDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, SessionMaterial, Session, Material) {
        var vm = this;

        vm.sessionMaterial = entity;
        vm.clear = clear;
        vm.save = save;
        vm.sessions = Session.query();
        vm.materials = Material.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.sessionMaterial.id !== null) {
                SessionMaterial.update(vm.sessionMaterial, onSaveSuccess, onSaveError);
            } else {
                SessionMaterial.save(vm.sessionMaterial, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('proyectoIntegradorApp:sessionMaterialUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
