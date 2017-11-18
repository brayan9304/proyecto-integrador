(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('MaterialPiDetailController', MaterialPiDetailController);

    MaterialPiDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Material', 'SessionMaterial'];

    function MaterialPiDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Material, SessionMaterial) {
        var vm = this;

        vm.material = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('proyectoIntegradorApp:materialUpdate', function(event, result) {
            vm.material = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
