(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionMaterialPiDetailController', SessionMaterialPiDetailController);

    SessionMaterialPiDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'SessionMaterial', 'Session', 'Material'];

    function SessionMaterialPiDetailController($scope, $rootScope, $stateParams, previousState, entity, SessionMaterial, Session, Material) {
        var vm = this;

        vm.sessionMaterial = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('proyectoIntegradorApp:sessionMaterialUpdate', function(event, result) {
            vm.sessionMaterial = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
