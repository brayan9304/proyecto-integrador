(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionPiDetailController', SessionPiDetailController);

    SessionPiDetailController.$inject = ['$scope', '$rootScope', 'previousState', 'entity', 'DataUtils'];

    function SessionPiDetailController($scope, $rootScope, previousState, entity, DataUtils) {
        var vm = this;

        vm.session = entity;
        vm.previousState = previousState.name;
        vm.materials = vm.session.materials;
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        var unsubscribe = $rootScope.$on('proyectoIntegradorApp:sessionUpdate', function(event, result) {
            vm.session = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
