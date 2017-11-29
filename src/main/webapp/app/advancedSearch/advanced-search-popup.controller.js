(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('AdvancedSearchPopUpController', AdvancedSearchPopUpController);

    AdvancedSearchPopUpController.$inject = ['$scope', 'sessionEntities', 'idMaterial', 'Session', 'Material', '$uibModalInstance'];

    function AdvancedSearchPopUpController($scope, sessionEntities, idMaterial, Session, Material, $uibModalInstance) {
        var vm = this;
        vm.sessions = sessionEntities;
        vm.materialId = idMaterial;
        vm.material = Material.get({id: vm.materialId});
        vm.sessionsToAdd = [];
        vm.save = save;
        vm.clear = clear;

        function save() {
            if (vm.sessionsToAdd) {
                vm.sessionsToAdd.forEach(function (session) {
                    if (!materialExists(session, vm.materialId)) {
                        session.materials.push(vm.material);
                        Session.update(session, onSaveSuccess, onSaveError);

                    }

                });
            }
        }

        function materialExists(session, material) {
            var exists = false;
            if (session.materials) {
                session.materials.forEach(function (m) {
                    if (material == m.id) {
                        exists = true;
                    }
                });
            }
            return exists;
        }

        function onSaveSuccess(result) {
            $('.add-material-alert').html("Material Added");
            setTimeout(function(){
                $uibModalInstance.close(result);
            }, 3000);
        }

        function onSaveError() {
            $('.add-material-alert').html("Material not Added");
        }

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();

