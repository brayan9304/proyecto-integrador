(function() {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('PostPiDialogController', PostPiDialogController);

    PostPiDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Post', 'Professor', 'Comment'];

    function PostPiDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Post, Professor, Comment) {
        var vm = this;

        vm.post = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.professors = Professor.query();
        vm.comments = Comment.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.post.id !== null) {
                Post.update(vm.post, onSaveSuccess, onSaveError);
            } else {
                Post.save(vm.post, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('proyectoIntegradorApp:postUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setMaterialFile = function ($file, post) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        post.materialFile = base64Data;
                        post.materialFileContentType = $file.type;
                    });
                });
            }
        };

    }
})();
