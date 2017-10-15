(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionPiController', SessionPiController);

    SessionPiController.$inject = ['Session'];

    function SessionPiController(Session) {

        var vm = this;

        vm.sessions = [];

        loadAll();

        function loadAll() {
            Session.query(function(result) {
                vm.sessions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
