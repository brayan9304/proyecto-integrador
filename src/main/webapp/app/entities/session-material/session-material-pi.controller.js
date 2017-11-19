(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionMaterialPiController', SessionMaterialPiController);

    SessionMaterialPiController.$inject = ['SessionMaterial'];

    function SessionMaterialPiController(SessionMaterial) {

        var vm = this;

        vm.sessionMaterials = [];

        loadAll();

        function loadAll() {
            SessionMaterial.query(function(result) {
                vm.sessionMaterials = result;
                vm.searchQuery = null;
            });
        }
    }
})();
