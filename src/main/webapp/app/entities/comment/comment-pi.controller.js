(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('CommentPiController', CommentPiController);

    CommentPiController.$inject = ['Comment'];

    function CommentPiController(Comment) {

        var vm = this;

        vm.comments = [];

        loadAll();

        function loadAll() {
            Comment.query(function(result) {
                vm.comments = result;
                vm.searchQuery = null;
            });
        }
    }
})();
