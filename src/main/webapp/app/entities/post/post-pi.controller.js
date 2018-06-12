(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('PostPiController', PostPiController);

    PostPiController.$inject = ['DataUtils', 'Post'];

    function PostPiController(DataUtils, Post) {

        var vm = this;

        vm.posts = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Post.query(function(result) {
                vm.posts = result;
                vm.searchQuery = null;
            });
        }
    }
})();
