(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('SessionPiController', SessionPiController);

    SessionPiController.$inject = ['sessions', 'courseId'];

    function SessionPiController(sessions, courseId) {
        var vm = this;
        vm.sessions = sessions;
        vm.courseId = courseId;

    }
})();
