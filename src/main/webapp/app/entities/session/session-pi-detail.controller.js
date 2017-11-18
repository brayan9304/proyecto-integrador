(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionPiDetailController', SessionPiDetailController);

    SessionPiDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Session', 'Course', 'SessionMaterial'];

    function SessionPiDetailController($scope, $rootScope, $stateParams, previousState, entity, Session, Course, SessionMaterial) {
        var vm = this;

        vm.session = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('proyectoIntegradorApp:sessionUpdate', function(event, result) {
            vm.session = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
