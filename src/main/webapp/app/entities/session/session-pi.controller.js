(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionPiController', SessionPiController);

    SessionPiController.$inject = ['sessions'];

    function SessionPiController(sessions) {
        var vm = this;
        vm.sessions = sessions;

    }
})();
