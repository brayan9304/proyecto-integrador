(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionPiDetailController', SessionPiDetailController);

    SessionPiDetailController.$inject = ['$state', '$scope', '$rootScope', 'previousState', 'entityId', 'DataUtils', 'Session'];

    function SessionPiDetailController($state, $scope, $rootScope, previousState, entityId, DataUtils, Session) {
        var vm = this;

        vm.session = Session.get({id: entityId});
        vm.previousState = previousState.name;
        vm.materials = vm.session.materials;
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.removeMaterial = removeMaterialFromSession;


        var unsubscribe = $rootScope.$on('proyectoIntegradorApp:sessionUpdate', function (event, result) {
            vm.session = result;
        });
        $scope.$on('$destroy', unsubscribe);

        function removeMaterialFromSession(idMaterial) {
            deleteMaterials(idMaterial);
            if (vm.session.id !== null) {
                Session.update(vm.session);
            } else {
                Session.save(vm.session);
            }
        }

        function deleteMaterials(materialId) {
            var found = false;
            var counter = 0;
            var index = null;
            while (!found) {
                if (vm.session.materials[counter].id == materialId) {
                    found = true;
                    index = counter;
                }
                counter++;
            }
            if (index != null) {
                vm.session.materials.splice(index, 1);
            }
        }
    }
})();
