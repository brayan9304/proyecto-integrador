(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('CoursePiController', CoursePiController);

    CoursePiController.$inject = ['Course'];

    function CoursePiController(Course) {

        var vm = this;

        vm.courses = [];

        loadAll();

        function loadAll() {
            Course.query(function(result) {
                vm.courses = result;
                vm.searchQuery = null;
            });
        }
    }
})();
